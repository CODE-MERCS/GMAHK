import axios from "axios";
const API_BASE_URL = "https://gmahkgas.vercel.app/form";

export const getAuthToken = () => {
  return localStorage.getItem("token");
};

export const saveFormData = async (formData: Record<string, any>) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Unauthorized: Token tidak ditemukan");

    // 🔹 Pastikan bulan ada dan dalam format string lowercase
    const finalData = {
      bulan: formData["bulan"] ? formData["bulan"].toLowerCase().trim() : "",
      tahun: formData["tahun"] ? Number(formData["tahun"]) : new Date().getFullYear(),
      jemaat: formData["jemaat"] || "",
      wilayah: formData["wilayah"] || "",
      ketuaJemaatName: formData["ketuaJemaatName"] || "",
      ...Object.fromEntries(
        Object.entries(formData)
          .filter(([key]) => key !== "bulan" && key !== "tahun" && key !== "jemaat" && key !== "wilayah" && key !== "ketuaJemaatName")
          .map(([key, value]) => [key, Number(value) || 0])
      ),
    };

    // 🔍 Debugging: Lihat data sebelum dikirim ke API
    console.log("📤 Data yang dikirim ke API (JSON):", finalData);

    const response = await axios.post(`${API_BASE_URL}/save`, finalData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ Response API:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Gagal menyimpan data:", error);
    throw error;
  }
};

/**
 * Validasi data dengan API berdasarkan ID (1-13) menggunakan Bearer Token
 */
export const validateData = async (id: number, formData: FormData) => {
  if (id < 1 || id > 13) {
    throw new Error("ID validasi harus antara 1-13");
  }

  try {
    const token = getAuthToken();
    if (!token) throw new Error("Unauthorized: Token tidak ditemukan");

    const response = await axios.post(
      `${API_BASE_URL}/validation/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error validating data:", error);
    throw error;
  }
};

export const getHistory = async () => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Unauthorized: Token tidak ditemukan");

    const response = await axios.get(`${API_BASE_URL}/data`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("✅ History Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Gagal mengambil history:", error);
    throw error;
  }
};

export const getHistoryById = async (id: string | undefined) => {
  if (!id) return null;

  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized: Token tidak ditemukan");

    const response = await fetch(`${API_BASE_URL}/data/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    console.log("✅ Detail History API Response:", result);
    return result;
  } catch (error) {
    console.error("❌ Error fetching history detail:", error);
    return null;
  }
};

export const getHistoryByMonth = async (bulan: string, tahun: number | string) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Unauthorized: Token tidak ditemukan");

    // Use the correct endpoint format with both bulan and tahun
    const response = await axios.get(`${API_BASE_URL}/data/bulan/${bulan}/${tahun}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(`✅ History Data for ${bulan} ${tahun}:`, response.data);
    return response.data;
  } catch (error) {
    // Try fallback if the first endpoint format fails
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_BASE_URL}/data/${bulan}/${tahun}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log(`✅ History Data for ${bulan} ${tahun} (fallback):`, response.data);
      return response.data;
    } catch (fallbackError) {
      console.error(`❌ Gagal mengambil history untuk ${bulan} ${tahun}:`, error);
      throw error;
    }
  }
};


/**
 * Mengambil detail draft berdasarkan ID
 */
export const getDraftById = async (id: number) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Unauthorized: Token tidak ditemukan");

    const response = await axios.get(`${API_BASE_URL}/draft/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(`❌ Gagal mengambil draft ${id}:`, error);
    throw error;
  }
};

/**
 * Mengambil daftar draft
 */
export const getAllDrafts = async () => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Unauthorized: Token tidak ditemukan");

    const response = await axios.get(`${API_BASE_URL}/draft`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Gagal mengambil daftar draft:", error);
    throw error;
  }
};

/**
 * Mengirim draft ke form
 */
export const sendDraftToForm = async (draftId: number) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Unauthorized: Token tidak ditemukan");

    const response = await axios.post(
      `${API_BASE_URL}/draft/send/${draftId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(`❌ Gagal mengirim draft ${draftId}:`, error);
    throw error;
  }
};

/**
 * Menyimpan data ke draft
 */
export const saveToDraft = async (formData: Record<string, any>) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Unauthorized: Token tidak ditemukan");

    // Format data
    const finalData = {
      bulan: formData["bulan"] ? formData["bulan"].toLowerCase().trim() : "",
      tahun: formData["tahun"] ? Number(formData["tahun"]) : new Date().getFullYear(),
      jemaat: formData["jemaat"] || "",
      wilayah: formData["wilayah"] || "",
      ketuaJemaatName: formData["ketuaJemaatName"] || "",
      ...Object.fromEntries(
        Object.entries(formData)
          .filter(([key]) => key !== "bulan" && key !== "tahun" && key !== "jemaat" && key !== "wilayah" && key !== "ketuaJemaatName")
          .map(([key, value]) => [key, Number(value) || 0])
      ),
    };

    console.log("📤 Saving draft data:", finalData);

    const response = await axios.post(`${API_BASE_URL}/draft`, finalData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Gagal menyimpan draft:", error);
    throw error;
  }
};

/**
 * Validasi field draft berdasarkan ID kategori dan ID draft
 */
export const validateDraftField = async (categoryId: number, draftId: number, formData: FormData) => {
  if (categoryId < 1 || categoryId > 13) {
    throw new Error("ID kategori harus antara 1-13");
  }

  try {
    const token = getAuthToken();
    if (!token) throw new Error("Unauthorized: Token tidak ditemukan");

    const response = await axios.post(
      `${API_BASE_URL}/draft/${draftId}/validate/${categoryId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(`✅ Validasi draft field (category ${categoryId}) sukses:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`❌ Error validating draft field (category ${categoryId}):`, error);
    throw error;
  }
};

// ✅ GET data yang sudah di-approve
export const getApprovedFormData = async () => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Unauthorized: Token tidak ditemukan");

    const response = await axios.get(`${API_BASE_URL}/data/approved`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ Data approved berhasil diambil:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Gagal mengambil data approved:", error);
    throw error;
  }
};

// ✅ PUT approve data
export const approveFormData = async (id: number) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Unauthorized: Token tidak ditemukan");

    const response = await axios.put(
      `${API_BASE_URL}/data/${id}/approve`,
      {}, // Body kosong
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(`✅ Data ID ${id} berhasil diapprove:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`❌ Gagal mengapprove data ID ${id}:`, error);
    throw error;
  }
};


