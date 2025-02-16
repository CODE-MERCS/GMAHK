import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import { Mail, User, Lock, Phone, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast"; // 

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
    role: "PENDETA",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle perubahan input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    const { success, message } = await registerUser(
      formData.email,
      formData.name,
      formData.phone,
      formData.password,
      formData.role
    );
  
    setLoading(false);
  
    if (success) {
      // ✅ Pastikan toast sukses muncul hanya saat registrasi berhasil
      toast.success(message, {
        icon: "✅",
        duration: 3000,
        style: {
          background: "#4CAF50",
          color: "#fff",
          fontWeight: "bold",
        },
      });
  
      // 🚀 Redirect setelah 2 detik
      setTimeout(() => navigate("/"), 2000);
    } else {
      // ❌ Jika ada kesalahan, tampilkan toast error
      toast.error(message, {
        icon: "❌",
        duration: 3000,
        style: {
          background: "#FF4B4B",
          color: "#fff",
          fontWeight: "bold",
        },
      });
    }
  };
  

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative px-4"
      style={{ backgroundImage: "url('gereja.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Toaster untuk notifikasi */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Container Box */}
      <div className="relative w-full max-w-xs sm:max-w-md py-16 sm:py-20">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link to="/">
            <img src="/logo.png" alt="GMAHK Logo" className="w-16 sm:w-20" />
          </Link>
        </div>

        {/* Register Form */}
        <div className="relative bg-white p-6 sm:p-10 rounded-2xl shadow-2xl w-full mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
            Daftar ke <span className="text-green-600">GMAHK</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                required
              />
            </div>

            {/* Name Field */}
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                name="name"
                placeholder="Nama"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                required
              />
            </div>

            {/* Phone Field */}
            <div className="relative">
              <Phone
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Nomor Telepon"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                required
              />
            </div>

            {/* Role Selection */}
            <div className="relative">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              >
                <option value="PENDETA">Pendeta</option>
                <option value="SEKRETARIS">Sekretaris</option>
                <option value="KETUADEPARTEMEN">Ketua Departemen</option>
              </select>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 font-semibold rounded-lg text-white shadow-lg transition-all ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 transform hover:scale-105"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin mr-2" size={18} />
                  Mendaftar...
                </span>
              ) : (
                "Daftar"
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6 text-gray-600">
            <p>
              Sudah punya akun?{" "}
              <Link to="/" className="text-green-600 hover:underline">
                Masuk sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
