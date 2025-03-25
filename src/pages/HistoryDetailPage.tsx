import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHistoryById } from "../api/form";
import { Loader2, Calendar, User } from "lucide-react";

const HistoryDetailPage = () => {
  const { id } = useParams(); // Get ID from URL
  const [historyDetail, setHistoryDetail] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await getHistoryById(id);
        setHistoryDetail(response.data); // Make sure to get 'data'
      } catch (error) {
        console.error("❌ Error fetching history detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const formatCapitalizedMonth = (month: string) => {
    if (!month) return "N/A";
    return month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
  };

  // Data fields to display in grid layout with their titles
  const dataFields = [
    { key: "hadirSabat2", title: "Anggota yang hadir Sabat ke-2 dalam Triwulan Berjalan" },
    { key: "hadirSabat7", title: "Anggota yang hadir Sabat ke-7 dalam Triwulan Berjalan" },
    { key: "persentaseKehadiranBulan", title: "Persentase Kehadiran Per Bulan" },
    { key: "jumlahKKR", title: "Jumlah KKR Oleh Ketua/Diakon" },
    { key: "targetBaptisan", title: "Target Baptisan Jemaat Tahun ini" },
    { key: "perlawatanJemaat", title: "Jumlah Perlawatan Kepada Anggota Jemaat (Jiwa)", image: "fotoPerlawatanJemaat" },
    { key: "perlawatannonSDA", title: "Jumlah Perlawatan Kepada Non SDA", image: "fotoPerlawatannonSDA" },
    { key: "perlawatanPendeta", title: "Jumlah Perlawatan Kepada Pendeta/Pemuka Anggota Lainnya", image: "fotoPerlawatanPendeta" },
    { key: "pelatihanUNI", title: "Jumlah Pelatihan Yang di Ikuti dari UNI/SSD/GC", image: "fotoPelatihanUNI" },
    { key: "pelatihanKonferens", title: "Jumlah Pelatihan Yang di Ikuti dari Konferens/Disctrict", image: "fotoPelatihanKonferens" },
    { key: "pelatihanPendeta", title: "Jumlah Pelatihan Yang di lakukan Pendeta/Ketua-ketua Jemaat", image: "fotoPelatihanPendeta" },
    { key: "kelompokPeduli", title: "Jumlah Kelompok Peduli di Jemaat", image: "fotoKelompokPeduli" },
    { key: "tamuKelompokPeduli", title: "Jumlah Tamu Dalam Kelompok Peduli", image: "fotoTamuKelompok" },
    { key: "pembelajaranAlkitab", title: "Jumlah Orang di Berikan Pembelajaran Alkitab Non SDA (Belum di Baptis)", image: "fotoPembelajaran" },
    { key: "baptisanBulanIni", title: "Baptisan Bulan Ini", image: "fotoBaptisanBulanIni" },
    { key: "seminarKhotbah", title: "Jumlah Mengikuti/Mangadakan Seminar Khotbah", image: "fotoSeminarKhotbah" },
    { key: "retreatPendeta", title: "Jumlah Retreat Yang Melibatkan Pendeta Jemaat" },
    { key: "penanamanGereja", title: "Jumlah Penanaman Gereja Baru/Ladang Baru", image: "fotoPenanamanGereja" },
    { key: "ketuaJemaat", title: "Jumlah Ketua Jemaat" },
    { key: "jumlahDiakon", title: "Jumlah Diakon" },
    { key: "berkhotbahSabat", title: "Jumlah Berkhotbah Pada Hari Sabat" },
    { key: "berkhotbahSabat7", title: "Jumlah Berkhotbah Pada Hari Sabat Ke-7" },
    { key: "persentasiDiakones", title: "Jumlah Persentasi Kehadiran Anggota per Bulan" },
    { key: "jumlahPersembahan", title: "Jumlah Persembahan" },
    { key: "komiteJemaat", title: "Jumlah Komite Jemaat (Paling kurang 1 kali dalam sebulan)", image: "fotoKomiteJemaat" },
  ];

  return (
    <div className="min-h-screen p-6">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Loader2 className="animate-spin text-green-700" size={40} />
        </div>
      ) : historyDetail ? (
        <>
          {/* Header with username and date */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-yellow-500">{historyDetail.username ?? "Unknown"}</h1>
            <h2 className="text-2xl font-bold text-green-600 mt-2">
              {formatCapitalizedMonth(historyDetail.bulan)} {historyDetail.tahun}
            </h2>
          </div>

          {/* Data Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataFields.map((field) => {
              // Skip if the field doesn't exist in the data
              if (historyDetail[field.key] === undefined) return null;

              // Get the image URL if it exists
              const imageUrl = field.image ? historyDetail[field.image] : null;

              return (
                <div key={field.key} className="flex flex-col">
                  {/* Header Card */}
                  <div className="bg-green-100 p-4 rounded-t-lg">
                    <h3 className="text-green-800 font-medium text-center">
                      {field.title}
                    </h3>
                  </div>
                  
                  {/* Value Card */}
                  <div className="bg-green-500 p-4 rounded-b-lg flex items-center justify-center">
                    <span className="text-white text-xl font-bold">
                      {historyDetail[field.key] ?? "..."}
                    </span>
                  </div>

                  {/* Image if available */}
                  {imageUrl && (
                    <div className="mt-2">
                      <img
                        src={imageUrl}
                        alt={`Image for ${field.title}`}
                        className="w-full h-auto object-cover rounded-lg shadow-md"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Metadata at the bottom */}
          <div className="mt-8 text-gray-500 text-center">
            <p>ID: {historyDetail.id}</p>
            <p>Created: {new Date(historyDetail.createdAt).toLocaleString()}</p>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-center text-gray-600">Data tidak ditemukan.</p>
        </div>
      )}
    </div>
  );
};

export default HistoryDetailPage;