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
export const saveFormData = async (formData: FormData) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Unauthorized: Token tidak ditemukan");

    const response = await axios.post(`${API_BASE_URL}/save`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error saving form data:", error);
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