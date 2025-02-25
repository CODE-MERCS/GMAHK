import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api/auth";
import toast, { Toaster } from "react-hot-toast";
import { Loader2, User } from "lucide-react";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    email: "",
    name: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await getProfile();

        if (response && response.user) {
          setProfile({
            email: response.user.email || "",
            name: response.user.name || "",
            phone: response.user.phone || "",
          });
        } else {
          toast.error("Gagal mengambil data profil");
        }
      } catch (error) {
        toast.error("Gagal mengambil data profil");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const formData = new FormData();
      formData.append("email", profile.email);
      formData.append("name", profile.name);
      formData.append("phone", profile.phone);

      await updateProfile(formData);
      toast.success("✅ Profil berhasil diperbarui!");
    } catch (error) {
      toast.error("❌ Gagal memperbarui profil");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-center flex-col">
          <User className="text-green-600" size={50} />
          <h1 className="text-3xl font-bold text-green-700 mt-2">Edit Profil</h1>
          <p className="text-gray-500 text-sm">Perbarui informasi akun Anda</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="animate-spin text-green-700" size={40} />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            {/* Email (disabled) */}
            <div>
              <label className="block font-semibold text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                disabled
              />
            </div>

            {/* Name */}
            <div>
              <label className="block font-semibold text-gray-700">Nama</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Masukkan Nama"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block font-semibold text-gray-700">Nomor Telepon</label>
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                placeholder="Masukkan Nomor Telepon"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={updating}
              className={`w-full p-3 font-semibold rounded-lg text-white shadow-lg transition-all ${
                updating
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 transform hover:scale-105"
              }`}
            >
              {updating ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin mr-2" size={18} />
                  Menyimpan...
                </span>
              ) : (
                "Simpan Perubahan"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
