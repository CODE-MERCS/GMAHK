import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { getSession } from "../utils/session"; // Cek session dari localStorage
import { Mail, Lock, Loader2 } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [noAccount, setNoAccount] = useState(false); // State untuk menangani akun yang tidak ditemukan
  const navigate = useNavigate();

  // Jika user sudah login, langsung redirect ke /dashboard
  useEffect(() => {
    const session = getSession();
    if (session.token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); 
    setLoading(true);
    setNoAccount(false);

    if (!email || !password) {
      setError("Email dan password harus diisi!");
      setLoading(false);
      return;
    }

    console.log("Attempting login with:", { email, password });

    const { success, role, message } = await login(email, password);
    console.log("Login response:", { success, role, message });

    setLoading(false);

    if (success) {
      console.log("Received role:", role);
      navigate("/dashboard"); // Arahkan ke dashboard setelah login sukses
    } else {
      setError(message || "Login gagal, coba lagi.");
      
      // Jika pesan error mengindikasikan akun tidak ditemukan
      if (message?.toLowerCase().includes("user not found") || message?.toLowerCase().includes("akun tidak ditemukan")) {
        setNoAccount(true);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative" style={{ backgroundImage: "url('gereja.png')" }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Login Box */}
      <div className="relative bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login ke <span className="text-green-600">GMAHK</span>
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
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 transform hover:scale-105"
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

        {/* Jika akun tidak ditemukan, tampilkan pesan ini */}
        {noAccount && (
          <div className="text-center text-red-600 mt-4">
            Akun tidak ditemukan. <br /> 
            <a href="/register" className="text-green-600 font-semibold hover:underline">Daftar Sekarang</a>
          </div>
        )}

        {/* Register Link */}
        <div className="text-center mt-6 text-gray-600">
          <p>
            Belum punya akun?{" "}
            <a href="/register" className="text-green-600 hover:underline">
              Daftar sekarang
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
