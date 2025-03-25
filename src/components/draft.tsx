import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Loader2, AlertCircle } from "lucide-react";
import { getAllDrafts } from "../api/form";

interface DraftData {
  id: number;
  tahun: number;
  bulan: string;
  username: string;
}

const Draft = () => {
  const [drafts, setDrafts] = useState<DraftData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDrafts = async () => {
      setLoading(true);
      try {
        const response = await getAllDrafts();
        
        if (response && response.data) {
          setDrafts(response.data);
        } else {
          setDrafts([]);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching drafts:", err);
        setError("Gagal memuat daftar draft. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchDrafts();
  }, []);

  // Function to format month name properly (capitalize first letter)
  const formatBulan = (bulan: string): string => {
    if (!bulan) return "N/A";
    return bulan.charAt(0).toUpperCase() + bulan.slice(1).toLowerCase();
  };

  // Get draft status indicator color
  const getDraftStatusColor = (draft: DraftData): string => {
    // This is a placeholder. In a real app, you'd have status information from the backend
    // For now, let's just return green for all drafts
    return "bg-green-500";
  };

  return (
    <div className="p-6">
      <div className="bg-green-100 p-4 rounded-lg mb-8">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <AlertCircle className="h-6 w-6 text-yellow-500" />
          </div>
          <div className="ml-3">
            <p className="text-yellow-700 font-medium">
              Draft yang disimpan dapat dilanjutkan dan dikirim ke sekretaris untuk proses verifikasi.
            </p>
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Draft Laporan
      </h1>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-green-700" size={40} />
        </div>
      ) : error ? (
        <div className="bg-red-100 p-4 rounded-lg text-red-700">
          <p>{error}</p>
        </div>
      ) : drafts.length === 0 ? (
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <p className="text-gray-600">Tidak ada draft laporan saat ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drafts.map((draft) => (
            <NavLink 
              to={`/dashboard/draft/${draft.id}`}
              key={draft.id}
              className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden"
            >
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {formatBulan(draft.bulan)}
                  </h2>
                  <div className={`h-3 w-3 rounded-full ${getDraftStatusColor(draft)}`}></div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Tahun:</span>
                  <span className="font-medium">{draft.tahun}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Dibuat oleh:</span>
                  <span className="font-medium">{draft.username}</span>
                </div>
              </div>

              <div className="bg-gray-50 p-3 text-center text-sm text-green-600 hover:bg-green-50 transition-colors">
                Lihat Draft
              </div>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default Draft;