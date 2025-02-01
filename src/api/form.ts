import axios from "axios";

const API_BASE_URL = "https://gmahkgas.vercel.app/form";

/**
 * Ambil token dari localStorage
 */
const getAuthToken = () => {
  return localStorage.getItem("token");
};

/**
 * Mengirim data kehadiran ke API dengan Bearer Token
 */
export const saveFormData = async (formData: Record<string, any>) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Unauthorized: Token tidak ditemukan");

    // 🔹 Pastikan bulan ada dan dalam format string lowercase
    const finalData = {
      bulan: formData["bulan"] ? formData["bulan"].toLowerCase().trim() : "",
      ...Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [
          key,
          key !== "bulan" ? Number(value) || 0 : value, // Konversi selain bulan ke number
        ])
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
  
      const response = await axios.post(`${API_BASE_URL}/validation/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
  
      return response.data;
    } catch (error) {
      console.error("Error validating data:", error);
      throw error;
    }
  };