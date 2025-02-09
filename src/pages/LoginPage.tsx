import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { getSession } from "../utils/session";
import { Mail, Lock, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const session = getSession();
    if (session.token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast.error("⚠️ Email dan password harus diisi!", {
        style: { background: "#ffcccc", color: "#b00000", fontWeight: "bold" },
      });
      setLoading(false);
      return;
    }

    const { success, role, message } = await login(email, password);

    setLoading(false);

    if (success) {
      toast.success("✅ Login berhasil! Redirecting...", {
        duration: 2000,
        style: { background: "#4CAF50", color: "#fff", fontWeight: "bold" },
      });

      setTimeout(() => navigate("/dashboard"), 2000);
    } else {
      toast.error(message || "❌ Login gagal, coba lagi.", {
        style: { background: "#ffcccc", color: "#b00000", fontWeight: "bold" },
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

      {/* Toaster */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Box Container */}
      <div className="relative w-full max-w-xs sm:max-w-md py-16">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link to="/">
            <img src="/logo.png" alt="GMAHK Logo" className="w-16 sm:w-20" />
          </Link>
        </div>

        {/* Form Container */}
        <div className="relative bg-white p-6 sm:p-10 rounded-2xl shadow-2xl w-full mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
            Login ke <span className="text-green-600">PELITA</span>
          </h2>

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

            {/* Login Button */}
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
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="text-center mt-6 text-gray-600 text-sm sm:text-base">
            <p>
              Belum punya akun?{" "}
              <Link to="/register" className="text-green-600 hover:underline">
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
