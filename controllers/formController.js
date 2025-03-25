const { saveFormData,saveDraft,deleteDraft,moveDraftToForm } = require("../services/formService");
const { sendWhatsAppNotification } = require('../services/notificationService');
const { validateImageWithGPT } = require("../services/gptValidation");
const { uploadImageToImageKit } = require("../services/imageKitService");
const categoryMappings = require("../configs/categoryMapping");
const prisma = require("../configs/prisma");


// Mapping kategori ke field database
const categoryMapping = {
  1: { field: 'perlawatanJemaat', imageField: 'fotoPerlawatanJemaat' },
  2: { field: 'perlawatannonSDA', imageField: 'fotoPerlawatannonSDA' },
  3: { field: 'perlawatanPendeta', imageField: 'fotoPerlawatanPendeta' },
  4: { field: 'pelatihanUNI', imageField: 'fotoPelatihanUNI', optional: true },
  5: { field: 'pelatihanKonferens', imageField: 'fotoPelatihanKonferens', optional: true },
  6: { field: 'pelatihanPendeta', imageField: 'fotoPelatihanPendeta', optional: true },
  7: { field: 'kelompokPeduli', imageField: 'fotoKelompokPeduli', optional: true },
  8: { field: 'tamuKelompokPeduli', imageField: 'fotoTamuKelompok', optional: true },
  9: { field: 'pembelajaranAlkitab', imageField: 'fotoPembelajaran', optional: true },
  10: { field: 'baptisanBulanIni', imageField: 'fotoBaptisanBulanIni' },
  11: { field: 'seminarKhotbah', imageField: 'fotoSeminarKhotbah', optional: true },
  12: { field: 'penanamanGereja', imageField: 'fotoPenanamanGereja', optional: true },
  13: { field: 'komiteJemaat', imageField: 'fotoKomiteJemaat' }
};

// Objek untuk menyimpan hasil validasi sementara
let validationResults = {};
let inputData = {};


// ✅ Endpoint untuk Validasi Gambar
const validateFormData = () => async (req, res) => {
  try {
    const { category } = req.params;
    const mapping = categoryMapping[category];
    
    if (!mapping) {
      return res.status(400).json({ message: 'Kategori tidak valid' });
    }

    const count = req.body[mapping.field];
    const file = req.file;


    // Handle field optional
    if (mapping.optional) {
      if (!count || count === '0') {
        // Jika tidak diisi, set ke 0 dan skip validasi
        inputData[mapping.field] = 0;
        inputData[mapping.imageField] = null;
        validationResults[category] = { skipped: true };
        return res.status(200).json({
          message: `Field optional ${mapping.field} di-set ke 0`,
          skipped: true
        });
      }
    }

    if (!count || isNaN(count)) {
      return res.status(400).json({ message: `Field ${mapping.field} harus berupa angka.` });
    }

    if (!file) {
      return res.status(400).json({ message: "Gambar diperlukan untuk validasi." });
    }

    console.log(`Uploading image for category ${category}...`);
    const imageUrl = await uploadImageToImageKit(file);

    console.log("Validating with GPT...");
    const validationResult = await validateImageWithGPT(imageUrl, parseInt(count, 10));

    validationResults[category] = {
      valid: validationResult.valid,
      count: parseInt(count, 10),
      imageUrl,
    };

    inputData[mapping.field] = parseInt(count, 10);
    inputData[mapping.imageField] = imageUrl;

    res.status(200).json({
      message: `Validation successful untuk kategori ${category}`,
      valid: validationResult.valid,
      category,
      imageUrl,
      count: parseInt(count, 10),
    });
  } catch (error) {
    console.error(`Error in validateFormData:`, error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// New function for validating draft fields
const validateDraftField = async (req, res) => {
  try {
    const { category, draftId } = req.params;
    const mapping = categoryMapping[category];
    
    if (!mapping) {
      return res.status(400).json({ message: 'Kategori tidak valid' });
    }

    // Check if draft exists
    const draft = await prisma.draft.findUnique({
      where: { id: parseInt(draftId, 10) }
    });

    if (!draft) {
      return res.status(404).json({ message: 'Draft tidak ditemukan' });
    }

    const count = req.body[mapping.field];
    const file = req.file;

    // Handle optional fields
    if (mapping.optional) {
      if (!count || count === '0') {
        // Update draft with zero value for optional field
        await prisma.draft.update({
          where: { id: parseInt(draftId, 10) },
          data: {
            [mapping.field]: 0,
            [mapping.imageField]: null
          }
        });

        return res.status(200).json({
          message: `Field optional ${mapping.field} di-set ke 0`,
          skipped: true,
          draft: await prisma.draft.findUnique({
            where: { id: parseInt(draftId, 10) }
          })
        });
      }
    }

    if (!count || isNaN(count)) {
      return res.status(400).json({ message: `Field ${mapping.field} harus berupa angka.` });
    }

    if (!file) {
      return res.status(400).json({ message: "Gambar diperlukan untuk validasi." });
    }

    // Upload and validate image
    console.log(`Uploading image for draft ${draftId}, category ${category}...`);
    const imageUrl = await uploadImageToImageKit(file);

    console.log("Validating with GPT...");
    const validationResult = await validateImageWithGPT(imageUrl, parseInt(count, 10));

    // Update draft with validated field data
    if (validationResult.valid) {
      await prisma.draft.update({
        where: { id: parseInt(draftId, 10) },
        data: {
          [mapping.field]: parseInt(count, 10),
          [mapping.imageField]: imageUrl
        }
      });
    }

    // Get updated draft
    const updatedDraft = await prisma.draft.findUnique({
      where: { id: parseInt(draftId, 10) }
    });

    res.status(200).json({
      message: `Validation ${validationResult.valid ? 'successful' : 'failed'} untuk kategori ${category}`,
      valid: validationResult.valid,
      category,
      imageUrl,
      count: parseInt(count, 10),
      draft: updatedDraft
    });
  } catch (error) {
    console.error(`Error in validateDraftField:`, error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// ✅ Endpoint untuk Menyimpan Data ke Database
const saveFormDataToDB = async (req, res) => {
  // Deklarasikan recipients di luar blok try
  let recipients = [];

  try {
    // 1. Cek kategori wajib yang belum divalidasi atau validasinya gagal
    const requiredCategories = Object.values(categoryMapping)
      .filter(m => !m.optional)
      .map(m => Object.keys(categoryMapping).find(key => categoryMapping[key] === m));

    const invalidFields = requiredCategories
      .filter(cat => {
        const result = validationResults[cat];
        return !result || result.valid === false;
      })
      .map(cat => ({
        field: categoryMapping[cat].field,
        status: !validationResults[cat] ? "Belum divalidasi" : "Validasi gagal"
      }));

    if (invalidFields.length > 0) {
      return res.status(400).json({
        message: "Validasi gagal untuk field wajib",
        invalidFields
      });
    }

    // Handle field optional yang tidak diisi
    Object.values(categoryMapping).forEach(m => {
      if (m.optional && !inputData[m.field]) {
        inputData[m.field] = 0;
        inputData[m.imageField] = null;
      }
    });

    const userId = req.user.id;
    const { bulan } = req.body;

    const { tahun } = req.body;


    // Validasi bulan
    if (!bulan || typeof bulan !== 'string' || bulan.trim() === '') {
      return res.status(400).json({ 
        message: "Bulan wajib diisi"
      });
    }

if (!tahun || isNaN(tahun)) {
  return res.status(400).json({ 
    message: "Tahun wajib diisi dan harus angka"
  });
}
    // Satukan data
    const finalData = {
      ...inputData,
      userId,
      bulan: bulan.trim(),
      tahun: tahun.trim(),
      hadirSabat2: req.body.hadirSabat2,
      hadirSabat7: req.body.hadirSabat7,
      persentaseKehadiranBulan: req.body.persentaseKehadiranBulan,
      jumlahKKR: req.body.jumlahKKR,
      targetBaptisan: req.body.targetBaptisan,
      retreatPendeta: req.body.retreatPendeta,
      ketuaJemaat: req.body.ketuaJemaat,
      jumlahDiakon: req.body.jumlahDiakon,
      berkhotbahSabat: req.body.berkhotbahSabat,
      berkhotbahSabat7: req.body.berkhotbahSabat7,
      persentasiDiakones: req.body.persentasiDiakones,
      jumlahPersembahan: req.body.jumlahPersembahan
    };

    // Simpan data ke database
    const formData = await saveFormData(finalData);

    // 🔥 Bagian baru untuk mengirim notifikasi
    try {
      // 1. Ambil penerima
      recipients = await prisma.user.findMany({
        where: {
          role: { in: ['SEKRETARIS', 'PENDETA'] },
          phone: { not: null, startsWith: '08' }
        },
        select: { phone: true, name: true, role: true }
      });

      // 2. Siapkan pesan
      const message = `Form telah berhasil di Inputkan pada bulan ${bulan.trim()}`;

      // 3. Kirim ke semua penerima secara paralel
      const sendPromises = recipients.map(async (user) => {
        try {
          await sendWhatsAppNotification(user.phone, message);
          console.log(`Notifikasi terkirim ke ${user.name} (${user.role}) - ${user.phone}`);
        } catch (error) {
          console.error(`Gagal mengirim ke ${user.phone}:`, error.message);
        }
      });

      await Promise.all(sendPromises);
      console.log(`Total notifikasi terkirim: ${recipients.length}`);
    } catch (error) {
      console.error('Error dalam proses notifikasi:', error);
      // Tetap lanjutkan meski gagal kirim notifikasi
    }

  // Reset data
  validationResults = {};
  inputData = {};

 // Ambil nama user yang menginput
 const user = await prisma.user.findUnique({
  where: { id: userId },
  select: { name: true }
});

// Kembalikan respon
res.status(201).json({
  message: "Data berhasil disimpan",
  data: {
    ...formData,
    inputBy: user.name // Tambahkan nama penginput
  },
  notificationSent: recipients ? recipients.length : 0
});
} catch (error) {
console.error("Error in saveFormDataToDB:", error.message);
res.status(500).json({ message: "Internal server error", error: error.message });
}
};

// ✅ GET: Mengambil semua data form yang telah disimpan
const getAllFormData = async (req, res) => {
  try {
    const formData = await prisma.formData.findMany({
      include: {
        user: {
          select: {
            name: true // Hanya ambil nama user
          }
        }
      }
    });

    // Format ulang data untuk menyertakan username dan hapus objek user
    const formattedData = formData.map(data => {
      const { user, ...rest } = data; // Pisahkan objek user dari data lainnya
      return {
        ...rest,
        username: user.name // Tambahkan username ke dalam respons
      };
    });

    res.status(200).json({ message: "Data retrieved successfully", data: formattedData });
  } catch (error) {
    console.error("Error in getAllFormData:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// ✅ GET: Mengambil data form berdasarkan bulan
const getFormDataByBulan = async (req, res) => {
  try {
    const { bulan, tahun } = req.params;
    const formData = await prisma.formData.findMany({
      where: { 
        bulan: bulan,
        tahun: parseInt(tahun) 
      },
      include: {
        user: {
          select: { name: true }
        }
      }
    });

    if (!formData.length) {
      return res.status(404).json({ message: "No data found for this month" });
    }

    // Format ulang data untuk menyertakan username dan hapus objek user
    const formattedData = formData.map(data => {
      const { user, ...rest } = data; // Pisahkan objek user dari data lainnya
      return {
        ...rest,
        username: user.name // Tambahkan username ke dalam respons
      };
    });

    res.status(200).json({ message: "Data retrieved successfully", data: formattedData });
  } catch (error) {
    console.error("Error in getFormDataByBulan:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// ✅ GET: Mengambil data form berdasarkan ID
const getFormDataById = async (req, res) => {
  try {
    const { id } = req.params;

    // Cari data berdasarkan ID
    const formData = await prisma.formData.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        user: {
          select: {
            name: true // Hanya ambil nama user
          }
        }
      }
    });

    if (!formData) {
      return res.status(404).json({ message: "Data not found" });
    }

    // Format ulang data untuk menyertakan username dan hapus objek user
    const { user, ...rest } = formData;
    const formattedData = {
      ...rest,
      username: user.name // Tambahkan username ke dalam respons
    };

    res.status(200).json({ message: "Data retrieved successfully", data: formattedData });
  } catch (error) {
    console.error("Error in getFormDataById:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const saveToDraft = async (req, res) => {
  try {
    const userId = req.user.id; // Sudah numerik setelah middleware diperbaiki
    const { bulan, tahun } = req.body;

    // Validasi user (pastikan userId adalah angka)
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    // Validasi input
    if (!bulan || typeof bulan !== 'string') {
      return res.status(400).json({ message: "Field bulan wajib diisi" });
    }
    
    if (!tahun || isNaN(tahun)) {
      return res.status(400).json({ message: "Field tahun wajib diisi dan harus angka" });
    }

    const draftData = {
      ...req.body,
      userId,
      bulan: bulan.trim(),
      tahun: parseInt(tahun, 10) // Konversi ke number
    };

    const draft = await saveDraft(draftData);
    
    res.status(201).json({
      message: "Draft berhasil disimpan",
      data: draft
    });
  } catch (error) {
    console.error("Error in saveToDraft:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ POST: Kirim Draft ke FormData
const sendDraftToForm = async (req, res) => {
  try {
    const { id } = req.params;

    // Get the draft
    const draft = await prisma.draft.findUnique({
      where: { id: parseInt(id, 10) }
    });

    if (!draft) {
      return res.status(404).json({ message: "Draft tidak ditemukan" });
    }

    // Identify required fields based on categoryMapping
    const requiredFields = [];
    
    // Loop through all category mappings to find required fields
    for (const [categoryId, config] of Object.entries(categoryMapping)) {
      if (!config.optional) {
        requiredFields.push({
          categoryId,
          field: config.field,
          imageField: config.imageField
        });
      }
    }

    // Check if all required fields are populated in the draft
    const invalidFields = [];
    
    for (const { field, imageField } of requiredFields) {
      const fieldValue = draft[field];
      const imageUrl = draft[imageField];
      
      if (!fieldValue || fieldValue <= 0 || !imageUrl) {
        invalidFields.push({
          field,
          status: "Belum divalidasi"
        });
      }
    }

    // Return error if required fields are missing
    if (invalidFields.length > 0) {
      return res.status(400).json({
        message: "Validasi gagal untuk field wajib",
        invalidFields
      });
    }

    // Move draft to FormData
    try {
      const formData = await moveDraftToForm(id);
      
      // Send notifications
      try {
        const recipients = await prisma.user.findMany({
          where: {
            role: { in: ['SEKRETARIS', 'PENDETA'] },
            phone: { not: null, startsWith: '08' }
          },
          select: { phone: true, name: true, role: true }
        });

        const message = `Form telah berhasil di Inputkan pada bulan ${formData.bulan}`;
        
        const sendPromises = recipients.map(async (user) => {
          try {
            await sendWhatsAppNotification(user.phone, message);
            console.log(`Notifikasi terkirim ke ${user.name} (${user.role}) - ${user.phone}`);
          } catch (error) {
            console.error(`Gagal mengirim ke ${user.phone}:`, error.message);
          }
        });

        await Promise.all(sendPromises);
      } catch (error) {
        console.error('Error dalam proses notifikasi:', error);
        // Continue even if notification fails
      }

      // Return success response
      res.status(200).json({
        message: "Draft berhasil dikirim ke form",
        data: formData
      });
    } catch (error) {
      return res.status(400).json({ 
        message: error.message 
      });
    }
  } catch (error) {
    console.error("Error in sendDraftToForm:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// ✅ GET: Ambil semua draft
const getAllDrafts = async (req, res) => {
  try {
    const drafts = await prisma.draft.findMany({
      include: { user: { select: { name: true } } } // <- Kurung ditutup dengan benar
    });
    
    res.status(200).json({ 
      message: "Drafts retrieved", 
      data: drafts.map(d => ({ ...d, username: d.user.name })) 
    });
  } catch (error) {
    console.error("Error in getAllDrafts:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ GET: Draft by bulan
const getDraftByBulan = async (req, res) => {
  try {
    const drafts = await prisma.draft.findMany({
      where: { bulan: req.params.bulan },
      include: { user: { select: { name: true } } }
    })
    
    res.status(200).json({ 
      message: "Drafts retrieved", 
      data: drafts.map(d => ({ ...d, username: d.user.name })) 
    });
  } catch (error) {
    console.error("Error in getDraftByBulan:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ GET: Draft by ID
const getDraftById = async (req, res) => {
  try {
    const draft = await prisma.draft.findUnique({
      where: { id: parseInt(req.params.id, 10) },
      include: { user: { select: { name: true } } }
    });
    
    res.status(200).json({ 
      message: "Draft retrieved", 
      data: { ...draft, username: draft.user.name } 
    });
  } catch (error) {
    console.error("Error in getDraftById:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ ENDPOINT APPROVAL DATA OLEH SEKRETARIS
const approveFormData = async (req, res) => {
  try {
    const { id } = req.params;

    // Cek role user
    if (req.user.role !== 'SEKRETARIS') {
      return res.status(403).json({ 
        message: "Hanya Sekretaris yang dapat melakukan approval" 
      });
    }

    // Update status validasi
    const updatedData = await prisma.formData.update({
      where: { id: parseInt(id, 10) },
      data: { valid: true },
      include: { 
        user: { 
          select: { 
            name: true 
          } 
        } 
      } // <- Penutupan kurung yang benar
    });

    // Format response
    const { user, ...rest } = updatedData;
    const formattedData = { ...rest, username: user.name };

    res.status(200).json({
      message: "Data berhasil divalidasi dan disetujui",
      data: formattedData
    });
  } catch (error) {
    console.error("Error in approveFormData:", error.message);
    res.status(500).json({ 
      message: "Gagal melakukan approval data",
      error: error.message 
    });
  }
};

// ✅ GET DATA YANG SUDAH DIVALIDASI
const getApprovedFormData = async (req, res) => {
  try {
    const approvedData = await prisma.formData.findMany({
      where: { valid: true },
      include: { 
        user: { 
          select: { 
            name: true 
          } 
        } 
      } // Perbaikan penutupan kurung yang benar
    });

    // Format ulang data
    const formattedData = approvedData.map(data => ({
      ...data,
      username: data.user.name
    }));

    res.status(200).json({ 
      message: "Data approved berhasil diambil",
      data: formattedData 
    });
  } catch (error) {
    console.error("Error in getApprovedFormData:", error.message);
    res.status(500).json({ 
      message: "Gagal mengambil data approved",
      error: error.message 
    });
  }
};





module.exports = { validateFormData, 
  saveFormDataToDB,  getFormDataByBulan,
  getAllFormData,getFormDataById, saveToDraft,
  sendDraftToForm,
  getAllDrafts,
  getDraftByBulan,
  getDraftById,validateDraftField, getApprovedFormData, approveFormData};