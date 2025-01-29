const { saveFormData } = require("../services/formService");
const { validateImageWithGPT } = require("../services/gptValidation");
const { uploadImageToImageKit } = require("../services/imageKitService");

// Mapping kategori ke field database
const categoryMapping = {
  // ...kategori wajib
  1: { field: 'perlawatanJemaat', imageField: 'fotoPerlawatanJemaat' },
  2: { field: 'perlawatannonSDA', imageField: 'fotoPerlawatannonSDA' },
  3: { field: 'perlawatanPendeta', imageField: 'fotoPerlawatanPendeta' },
  
  // Kategori optional
  4: { 
    field: 'pelatihanUNI', 
    imageField: 'fotoPelatihanUNI',
    optional: true 
  },
  5: { 
    field: 'pelatihanKonferens', 
    imageField: 'fotoPelatihanKonferens',
    optional: true 
  },
  6: { 
    field: 'pelatihanPendeta', 
    imageField: 'fotoPelatihanPendeta',
    optional: true 
  },
  7: { 
    field: 'kelompokPeduli', 
    imageField: 'fotoKelompokPeduli',
    optional: true 
  },
  8: { 
    field: 'tamuKelompokPeduli', 
    imageField: 'fotoTamuKelompok',
    optional: true 
  },
  9: { 
    field: 'pembelajaranAlkitab', 
    imageField: 'fotoPembelajaran',
    optional: true 
  },
  10: { 
    field: 'baptisanBulanIni', 
    imageField: 'fotoBaptisanBulanIni' 
  },
  11: { 
    field: 'seminarKhotbah', 
    imageField: 'fotoSeminarKhotbah',
    optional: true 
  },
  12: { 
    field: 'penanamanGereja', 
    imageField: 'fotoPenanamanGereja',
    optional: true 
  },
  13: { 
    field: 'komiteJemaat', 
    imageField: 'fotoKomiteJemaat' 
  }
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

// ✅ Endpoint untuk Menyimpan Data ke Database
const saveFormDataToDB = async (req, res) => {
  try {
    // Hanya check kategori yang wajib
    const requiredCategories = Object.values(categoryMapping)
      .filter(m => !m.optional)
      .map(m => Object.keys(categoryMapping).find(key => categoryMapping[key] === m));

    const missing = requiredCategories
      .filter(cat => !validationResults[cat] && !categoryMapping[cat].optional)
      .map(cat => categoryMapping[cat].field);

    if (missing.length > 0) {
      return res.status(400).json({ 
        message: `Kategori wajib belum divalidasi`,
        missing
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

    if (!bulan) {
      return res.status(400).json({ message: "Bulan harus dipilih" });
    }

    const finalData = {
      ...inputData,
      userId,
      bulan,
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

    const formData = await saveFormData(finalData);

    // Reset data
    validationResults = {};
    inputData = {};

    res.status(201).json({
      message: "Data berhasil disimpan",
      data: formData,
    });
  } catch (error) {
    console.error("Error in saveFormDataToDB:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { validateFormData, saveFormDataToDB };