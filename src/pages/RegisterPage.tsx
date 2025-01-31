import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth"; 
import { Mail, User, Lock, Loader2 } from "lucide-react"; // Import ikon

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("PENDETA");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { success, message } = await registerUser(email, name, password, role);

    setLoading(false);

    if (success) {
      navigate("/login"); // Redirect ke halaman login
    } else {
      setError(message || "Registrasi gagal");
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('gereja.png')" }}
    >
      {/* Overlay untuk memperjelas teks */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Register Box */}
      <div className="relative bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Daftar ke <span className="text-green-600">GMAHK</span>
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              required
            />
          </div>

          {/* Name Field */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              required
            />
          </div>

          {/* Role Selection */}
          <div className="relative">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            >
              <option value="PENDETA">Pendeta</option>
              <option value="JEMAAT">Jemaat</option> {/* Tambahkan role lainnya jika diperlukan */}
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
            <a href="/login" className="text-green-600 hover:underline">
              Masuk sekarang
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
