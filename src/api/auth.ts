import axios from "axios";
import { setSession } from "../utils/session";

const API_BASE_URL = "https://gmahkgas.vercel.app/auth";

export const login = async (email: string, password: string) => {
    try {
      console.log("Sending login request with:", { email, password });
  
      const response = await axios.post(`${API_BASE_URL}/login`, { 
          email, 
          password 
      }, { withCredentials: true });
  
      console.log("Full API response:", response);
  
      // Pastikan response memiliki data yang benar
      if (response.data && response.data.token && response.data.role) {
        const { token, role } = response.data;
        console.log("Extracted token and role:", { token, role });
  
        setSession(token, role); // Simpan session
        return { success: true, role };
      }
  
      return { success: false, message: response.data.message || "Invalid credentials" };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "An error occurred" };
    }
  };
  

export const registerUser = async (email: string, name: string, password: string, role: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, {
      email,
      name,
      password,
      role,
    });

    if (response.data.success) {
      return { success: true };
    } else {
      return { success: false, message: response.data.message || "Registration failed" };
    }
  } catch (err) {
    console.error(err);
    return { success: false, message: "An error occurred during registration" };
  }
};