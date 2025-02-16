import { useEffect, useState } from "react";
import { getHistory, getHistoryByMonth } from "../api/form";
import { Loader2 } from "lucide-react";
import { NavLink } from "react-router-dom";

const months = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

const History = () => {
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>(""); // Untuk filter bulan
  const [dataFetched, setDataFetched] = useState(false); // Menandakan data sudah di-fetch
  const [role, setRole] = useState<string | null>(null);
    useEffect(() => {
      const userRole = localStorage.getItem("role");
      setRole(userRole);
    }, []);
  
  const getHomePath = () => {
    if (role === "SEKRETARIS") return "/sekretaris";
    if (role === "KETUADEPARTEMEN") return "/ketuadepartemen";
    if (role === "PENDETA") return "/dashboard";
    return "/"; // Default untuk PENDETA atau lainnya
  };
  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        let response;
        if (selectedMonth) {
          response = await getHistoryByMonth(selectedMonth);
        } else {
          response = await getHistory();
        }

        if (response && response.data && response.data.length > 0) {
          setHistoryData(response.data);
        } else {
          setHistoryData([]); // Pastikan array kosong jika tidak ada data
        }

        setDataFetched(true);
      } catch (error) {
        console.error("❌ Error fetching history:", error);
        setHistoryData([]); // Tetapkan array kosong jika terjadi kesalahan
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [selectedMonth]);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold text-green-700 text-center my-12">
        History Laporan
      </h1>

      {/* 🔹 Dropdown untuk filter bulan */}
      <div className="flex justify-center mb-6">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="p-2 border border-gray-300 rounded-md shadow-sm"
        >
          <option value="">Semua Bulan</option>
          {months.map((month, index) => (
            <option key={index} value={month}>{month}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="animate-spin text-green-700" size={40} />
        </div>
      ) : (
        <>
          {historyData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {historyData.map((item, index) => (
                <NavLink 
                to={`${getHomePath()}/history/${item.id}`} // ✅ Navigasi ke halaman detail berdasarkan ID
                key={index}
                className="bg-white shadow-lg p-4 rounded-lg border border-gray-200 hover:shadow-xl transition"
              >
                <h2 className="text-lg font-semibold text-gray-700">
                  {item.username ?? "Unknown User"}
                </h2>
                <p className="text-gray-500">Bulan: {item.bulan ?? "N/A"}</p>
              </NavLink>
              ))}
            </div>
          ) : dataFetched ? (
            <p className="text-center text-gray-600 col-span-full">
              {selectedMonth ? `Tidak ada laporan di bulan ${selectedMonth}.` : "Tidak ada history laporan."}
            </p>
          ) : null}
        </>
      )}
    </div>
  );
};

export default History;
