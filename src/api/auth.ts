import axios from "axios";
import { setSession } from "../utils/session";
import { getAuthToken } from "./form";

const API_BASE_URL = "https://gmahkgas.vercel.app/auth";
const PROFILE_BASE_URL = "https://gmahkgas.vercel.app/profile";
/**
 * Fungsi untuk login user
 */
export const login = async (email: string, password: string) => {
  try {
    console.log("🔄 Sending login request with:", { email, password });

    const response = await axios.post(
      `${API_BASE_URL}/login`,
      { email, password },
      { withCredentials: true }
    );

    console.log("✅ Full API response:", response);

    // Pastikan response memiliki data yang benar
    if (response.data?.token && response.data?.role) {
      const { token, role } = response.data;
      console.log("🔑 Extracted token and role:", { token, role });

      setSession(token, role); // Simpan session
      return { success: true, role };
    }

    return {
      success: false,
      message:
        response.data?.message ||
        "❌ Login gagal, periksa kembali kredensial Anda.",
    };
  } catch (error: any) {
    console.error("❌ Login error:", error);

    // Menampilkan error spesifik berdasarkan respons API
    if (error.response) {
      return {
        success: false,
        message:
          error.response.data?.message || "⚠️ Terjadi kesalahan saat login.",
      };
    } else if (error.request) {
      return {
        success: false,
        message: "⚠️ Tidak dapat terhubung ke server, coba lagi nanti.",
      };
    } else {
      return {
        success: false,
        message: "⚠️ Kesalahan tidak terduga, coba lagi.",
      };
    }
  }
};

/**
 * Fungsi untuk mendaftarkan user baru
 */
export const registerUser = async (
  email: string,
  name: string,
  phone: string,
  password: string,
  role: string
) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, {
      email,
      name,
      phone,
      password,
      role,
    });

    console.log("Response dari API:", response.data);

    // ✅ Pastikan API mengembalikan message sukses
    if (
      response.data &&
      response.data.message === "User registered successfully"
    ) {
      return { success: true, message: "🎉 Registrasi berhasil!" };
    } else {
      return {
        success: false,
        message: response.data.message || "⚠️ Registrasi gagal, coba lagi.",
      };
    }
  } catch (error) {
    console.error("❌ Error saat registrasi:", error);

    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message:
          error.response.data.message ||
          "🚨 Terjadi kesalahan saat registrasi.",
      };
    }

    return {
      success: false,
      message: "🌐 Gagal menghubungi server. Periksa koneksi internet Anda.",
    };
  }
};

export const getProfile = async () => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Unauthorized: Token tidak ditemukan");

    const response = await axios.get(`${PROFILE_BASE_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("✅ Profile Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Gagal mengambil profile:", error);
    throw error;
  }
};

export const updateProfile = async (formData: FormData) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Unauthorized: Token tidak ditemukan");

    const response = await axios.patch(`${PROFILE_BASE_URL}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        // **Jangan tambahkan "Content-Type" secara manual, browser akan menentukannya**
      },
    });

    console.log("✅ Response API:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Gagal mengupdate profile:", error);
    throw error;
  }
};

