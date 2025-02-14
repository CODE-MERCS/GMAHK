import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import withRole from "../middleware/WithRole";
import { saveFormData, validateData } from "../api/form";
import toast, { Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";

const months = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];
// **FORMAT FORM YANG DI-SUBMIT**
const formStructure = [
  {
    key: "bulan",
    label: "Bulan",
    validate: false,
  },
  {
    category: "Jumlah Anggota Jemaat",
    items: [
      {
        key: "hadirSabat2",
        label:
          "(a). Jumlah Anggota Yang Hadir Sabat Ke-2 Dalam Triwulan Berjalan",
        validate: false,
      },
      {
        key: "hadirSabat7",
        label:
          "(b). Jumlah Anggota Yang Hadir Sabat Ke-7 Dalam Triwulan Berjalan",
        validate: false,
      },
      {
        key: "persentaseKehadiranBulan",
        label: "(c). Jumlah Persentasi Kehadiran Anggota Per Bulan",
        validate: false,
      },
    ],
  },
  {
    key: "perlawatanJemaat",
    label: "2. Jumlah Perlawatan Kepada Anggota Jemaat (Jiwa)",
    validate: true,
    id: 1,
  },
  {
    key: "perlawatannonSDA",
    label: "3. Jumlah Perlawatan Kepada Non SDA",
    validate: true,
    id: 2,
  },
  {
    key: "perlawatanPendeta",
    label: "4. Jumlah Perlawatan Kepada Pendeta/Pemuka Anggota Lainnya",
    validate: true,
    id: 3,
  },
  {
    key: "pelatihanUNI",
    label: "5. Jumlah Pelatihan Yang di Ikuti dari UNI/SSD/GC",
    validate: true,
    id: 4,
  },
  {
    key: "pelatihanKonferens",
    label: "6. Jumlah Pelatihan Yang di Ikuti dari Konferens/Disctrict",
    validate: true,
    id: 5,
  },
  {
    key: "pelatihanPendeta",
    label: "7. Jumlah Pelatihan Yang di lakukan Pendeta/Ketua-ketua Jemaat",
    validate: true,
    id: 6,
  },
  {
    key: "kelompokPeduli",
    label: "8. Jumlah Kelompok Peduli di Jemaat",
    validate: true,
    id: 7,
  },
  {
    key: "tamuKelompokPeduli",
    label: "9. Jumlah Tamu Dalam Kelompok Peduli",
    validate: true,
    id: 8,
  },
  {
    key: "pembelajaranAlkitab",
    label:
      "10. Jumlah Orang di Berikan Pembelajaran Alkitab Non SDA (Belum di Baptis)",
    validate: true,
    id: 9,
  },
  {
    key: "jumlahKKR",
    label: "11. Jumlah KKR Oleh Ketua/Diakon",
    validate: false,
  },
  {
    key: "targetBaptisan",
    label: "12. Target Baptisan Jemaat Tahun ini",
    validate: false,
  },
  {
    key: "baptisanBulanIni",
    label: "13. Baptisan Bulan Ini",
    validate: true,
    id: 10,
  },
  {
    key: "seminarKhotbah",
    label: "14. Jumlah Mengikuti/Mangadakan Seminar Khotbah",
    validate: true,
    id: 11,
  },
  {
    key: "retreatPendeta",
    label: "15. Jumlah Retreat Yang Melibatkan Pendeta Jemaat",
    validate: false,
  },
  {
    key: "penanamanGereja",
    label: "16. Jumlah Penanaman Gereja Baru/Ladang Baru",
    validate: true,
    id: 12,
  },
  { key: "ketuaJemaat", label: "17. Jumlah Ketua Jemaat", validate: false },
  { key: "jumlahDiakon", label: "18. Jumlah Diakon", validate: false },
  {
    category: "Jumlah Diakones",
    items: [
      {
        key: "berkhotbahSabat",
        label: "(a). Jumlah Berkhotbah Pada Hari Sabat",
        validate: false,
      },
      {
        key: "berkhotbahSabat7",
        label: "(b). Jumlah Berkhotbah Pada Hari Sabat Ke-7",
        validate: false,
      },
      {
        key: "persentasiDiakones",
        label: "(c). Jumlah Persentasi Kehadiran Anggota per Bulan",
        validate: false,
      },
      {
        key: "jumlahPersembahan",
        label: "(d). Jumlah Persembahan",
        validate: false,
      },
      {
        key: "komiteJemaat",
        label: "(e). Jumlah Komite Jemaat (Paling kurang 1 kali dalam sebulan)",
        validate: true,
        id: 13,
      },
    ],
  },
];

const Laporan = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    // Saat pertama kali load, ambil dari LocalStorage
    const savedData = localStorage.getItem("formData");
    return savedData ? JSON.parse(savedData) : {};
  });
  const [selectedFiles, setSelectedFiles] = useState<
    Record<string, File | null>
  >({});
  const [validations, setValidations] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // **🔹 Handle Input Form**
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newFormData);
    localStorage.setItem("formData", JSON.stringify(newFormData)); // Simpan ke LocalStorage
  };

  // **🔹 Handle Upload File**
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    if (e.target.files) {
      setSelectedFiles({ ...selectedFiles, [key]: e.target.files[0] });
    }
  };

  // **🔹 Handle Validasi**
  const handleValidation = async (id: number, key: string) => {
    const formDataToSend = new FormData();
    formDataToSend.append(key, formData[key] || "");

    if (selectedFiles[key]) {
      formDataToSend.append("image", selectedFiles[key] as File);
    }

    setLoading((prev) => ({ ...prev, [key]: true }));

    try {
      const response = await validateData(id, formDataToSend);
      setValidations((prev) => ({ ...prev, [key]: response }));
      toast.success("Validasi berhasil");
    } catch (error) {
      toast.error("Validasi gagal");
    }

    setLoading((prev) => ({ ...prev, [key]: false }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // 🔹 Pastikan bulan valid
    if (!formData["bulan"] || typeof formData["bulan"] !== "string") {
      toast.error("⚠️ Harap pilih bulan sebelum menyimpan!");
      setSaving(false);
      return;
    }

    // 🔹 Format data untuk API
    const finalData = {
      bulan: formData["bulan"].trim().toLowerCase(), // Pastikan format string tanpa spasi ekstra
      ...Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [
          key,
          key !== "bulan" ? Number(value) || 0 : value,
        ])
      ),
    };

    // 🔍 Debugging: Pastikan data sudah benar sebelum dikirim
    console.log("📤 Data yang dikirim ke API:", finalData);

    try {
      const response = await saveFormData(finalData);
      console.log("✅ Response API:", response);
      toast.success("✅ Data berhasil disimpan!");
    } catch (error) {
      console.error("❌ Gagal menyimpan data:", error);
      toast.error("❌ Gagal menyimpan data. Periksa kembali input Anda.");
    }

    setSaving(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-20 bg-white shadow-lg rounded-lg">
       <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
        Laporan Bulanan Kependetaan
      </h1>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-green-800 text-white">
            <th className="p-3 border">No</th>
            <th className="p-3 border">Items</th>
            <th className="p-3 border">Jumlah</th>
            <th className="p-3 border">Validasi</th>
          </tr>
        </thead>
        <tbody>
          {formStructure.map((row, index) => (
            <>
              {row.category && (
                <tr key={`header-${index}`} className="bg-gray-200 font-bold">
                  <td className="p-3 border">{index + 1}</td>
                  <td className="p-3 border" colSpan={3}>
                    {row.category}
                  </td>
                </tr>
              )}
              {(row.items || [row]).map((item, subIndex) => (
                <tr key={item.key} className="border">
                  <td className="p-3 border">
                    {index + 1}.{subIndex + 1}
                  </td>
                  <td className="p-3 border">{item.label}</td>
                  <td className="p-3 border">
                  {item.key === "bulan" ? (
                      // 🔹 Dropdown untuk memilih bulan
                      <select
                        name="bulan"
                        value={formData["bulan"] || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 border"
                      >
                        <option value="">Pilih Bulan</option>
                        {months.map((month, idx) => (
                          <option key={idx} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="number"
                        name={item.key}
                        value={formData[item.key] || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 border"
                      />
                    )}
                    {item.validate && (
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, item.key)}
                        className="mt-2 w-full p-2 border"
                      />
                    )}
                  </td>
                  <td className="p-3 border">
                    {item.validate ? (
                      <button
                        onClick={() => handleValidation(item.id!, item.key)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        {loading[item.key] ? "Loading..." : "Validasi"}
                      </button>
                    ) : (
                      "-"
                    )}
                    {validations[item.key] && (
                      <p className="mt-2">
                        {validations[item.key].valid
                          ? "Valid ✅"
                          : "Tidak Valid ❌"}
                      </p>
                    )}
                    {validations[item.key]?.imageUrl && (
                      <a
                        href={validations[item.key].imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline block mt-2"
                      >
                        Lihat Gambar
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleSubmit}
        type="submit"
        className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition mt-4 flex items-center justify-center"
        disabled={saving} // Agar tidak bisa diklik berulang kali
      >
        {saving ? (
          <span className="flex items-center">
            <Loader2 className="animate-spin mr-2" size={18} />
            Sedang Memproses...
          </span>
        ) : (
          "Simpan Laporan"
        )}
      </button>

    </div>
  );
};

export default withRole(Laporan, "PENDETA");
