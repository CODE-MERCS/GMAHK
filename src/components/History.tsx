import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"; // ✅ Tambahkan NavLink
import { getHistory } from "../api/form";
import { Loader2 } from "lucide-react";

const History = () => {
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const response = await getHistory();
        console.log("✅ API Response:", response); // Debugging
        
        if (response && response.data) {
          setHistoryData(response.data);
        } else {
          console.warn("⚠️ No data received:", response);
        }
      } catch (error) {
        console.error("❌ Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
        History Laporan
      </h1>

      {loading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="animate-spin text-green-700" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {historyData && historyData.length > 0 ? (
            historyData.map((item, index) => (
              <NavLink 
                to={`/dashboard/history/${item.id}`} // ✅ Navigasi ke halaman detail berdasarkan ID
                key={index}
                className="bg-white shadow-lg p-4 rounded-lg border border-gray-200 hover:shadow-xl transition"
              >
                <h2 className="text-lg font-semibold text-gray-700">
                  {item.username ?? "Unknown User"}
                </h2>
                <p className="text-gray-500">Bulan: {item.bulan ?? "N/A"}</p>
              </NavLink>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              Tidak ada history laporan.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default History;
