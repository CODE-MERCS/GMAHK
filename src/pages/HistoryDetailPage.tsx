import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHistoryById } from "../api/form";
import { Loader2 } from "lucide-react";

const HistoryDetailPage = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const [historyDetail, setHistoryDetail] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await getHistoryById(id);
        setHistoryDetail(response.data); // Pastikan mengambil `data`
      } catch (error) {
        console.error("❌ Error fetching history detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
        Detail History Laporan
      </h1>

      {loading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="animate-spin text-green-700" size={40} />
        </div>
      ) : historyDetail ? (
        <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-200 max-w-3xl mx-auto">
          {/* 🔹 User Info */}
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            User: {historyDetail.username ?? "Unknown"}
          </h2>
          <p className="text-gray-500">Bulan: {historyDetail.bulan ?? "N/A"}</p>
          <p className="text-gray-500">ID: {historyDetail.id}</p>
          <p className="text-gray-500">
            Created At: {new Date(historyDetail.createdAt).toLocaleString()}
          </p>

          {/* 🔹 Semua Data Laporan */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(historyDetail).map(([key, value]) =>
              key.startsWith("foto") && value ? (
                <div key={key} className="col-span-1 flex flex-col items-center">
                  <p className="text-gray-700 font-semibold">{key.replace("foto", "Foto ")}</p>
                  <img
                    src={value as string}
                    alt={key}
                    className="mt-2 w-40 h-40 object-cover rounded-lg shadow-md"
                  />
                </div>
              ) : !key.startsWith("foto") &&
                key !== "id" &&
                key !== "userId" &&
                key !== "createdAt" &&
                key !== "username" ? (
                <p key={key} className="text-gray-600">
                  <span className="font-semibold">{key.replace(/([A-Z])/g, " $1")}: </span>
                  {value}
                </p>
              ) : null
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Data tidak ditemukan.</p>
      )}
    </div>
  );
};

export default HistoryDetailPage;
    