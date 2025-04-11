import { useEffect, useState } from "react";
import { getHistory, getHistoryByMonth } from "../api/form";
import { Loader2 } from "lucide-react";
import { NavLink } from "react-router-dom";

const months = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 2030 - 2023 + 1 }, (_, i) => 2023 + i);

interface HistoryData {
  id: number;
  tahun: number;
  bulan: string;
  username: string;
  valid: boolean;
}

const History = () => {
  const [historyData, setHistoryData] = useState<HistoryData[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [dataFetched, setDataFetched] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  const getHomePath = () => {
    if (role === "SEKRETARIS") return "/sekretaris";
    if (role === "KETUADEPARTEMEN") return "/ketuadepartemen";
    if (role === "PENDETA") return "/dashboard";
    return "/";
  };

  // Fungsi untuk menentukan warna status
  const getStatusColor = (valid: boolean): string => {
    return valid ? "bg-green-500" : "bg-red-500";
  };

  // Format nama bulan
  const formatBulan = (bulan: string): string => {
    if (!bulan) return "N/A";
    return bulan.charAt(0).toUpperCase() + bulan.slice(1).toLowerCase();
  };

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        let response;
        if (selectedMonth) {
          response = await getHistoryByMonth(selectedMonth, selectedYear);
        } else {
          response = await getHistory();
        }

        if (response?.data?.length) {
          setHistoryData(response.data);
        } else {
          setHistoryData([]);
        }

        setDataFetched(true);
      } catch (error) {
        console.error("Error fetching history:", error);
        setHistoryData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [selectedMonth, selectedYear]);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold text-green-700 text-center my-12">
         Laporan Masuk
      </h1>

      <div className="flex justify-center gap-4 mb-6">
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

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded-md shadow-sm"
        >
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {historyData.map((item) => (
                <NavLink 
                  to={`${getHomePath()}/history/${item.id}`}
                  key={item.id}
                  className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-gray-800">
                        {formatBulan(item.bulan)}
                      </h2>
                      <div className={`h-3 w-3 rounded-full ${getStatusColor(item.valid)}`}></div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500">Tahun:</span>
                      <span className="font-medium">{item.tahun}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Dilaporkan oleh:</span>
                      <span className="font-medium">{item.username}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 text-center text-sm text-green-600 hover:bg-green-50 transition-colors">
                    Lihat Laporan
                  </div>
                </NavLink>
              ))}
            </div>
          ) : dataFetched ? (
            <p className="text-center text-gray-600 col-span-full">
              {selectedMonth 
                ? `Tidak ada laporan di bulan ${selectedMonth} tahun ${selectedYear}.`
                : "Tidak ada history laporan."}
            </p>
          ) : null}
        </>
      )}
    </div>
  );
};

export default History;