// Set session dengan localStorage
export const setSession = (token: string, role: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    console.log("Token and role successfully saved in localStorage:", { token, role });
  };
  
  // Ambil session dari localStorage
  export const getSession = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    console.log("Session fetched from localStorage:", { token, role });
    return { token, role };
  };
  
  // Hapus session dari localStorage
  export const clearSession = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    console.log("Session cleared: Token and role removed from localStorage.");
  };
  