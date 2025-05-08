import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getHistoryById, approveFormData } from "../api/form";
import { Loader2 } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FileText } from "lucide-react";

const HistoryDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Perbaiki inisialisasi useNavigate
  const [historyDetail, setHistoryDetail] = useState<Record<
    string,
    any
  > | null>(null);
  const [loading, setLoading] = useState(false);
  const [approving, setApproving] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await getHistoryById(id);
        setHistoryDetail(response.data);
      } catch (error) {
        console.error("❌ Error fetching history detail:", error);
      } finally {
        setLoading(false);
      }
    };

    const userRole = localStorage.getItem("role");
    setRole(userRole || "");

    fetchDetail();
  }, [id]);

  // Fungsi untuk handle approval
  const handleApprove = async () => {
    if (!id) return;
    setApproving(true);
    setError("");

    try {
      await approveFormData(Number(id));
      navigate("/sekretaris/history");
    } catch (err) {
      console.error("Gagal mengapprove:", err);
      setError("Gagal mengapprove laporan. Silakan coba lagi.");
    } finally {
      setApproving(false);
    }
  };

  // Add this function to your component
  const handleDownloadPDF = () => {
    if (!historyDetail) return;

    // Create a temporary div to render our table
    const reportContainer = document.createElement("div");
    reportContainer.style.position = "absolute";
    reportContainer.style.left = "-9999px";
    reportContainer.style.width = "1000px"; // Fixed width to ensure proper rendering
    document.body.appendChild(reportContainer);

    // HTML content for the report
    reportContainer.innerHTML = `
      <div style="font-family: Arial, sans-serif; padding: 20px; width: 100%;">
        <h2 style="text-align: center; font-size: 16px; font-weight: bold; margin-bottom: 15px;">
          LAPORAN BULANAN KEPENDETAAN TAHUN ${historyDetail.tahun}
        </h2>
        
        <div style="margin-bottom: 15px;">
  <div style="font-size: 12px; margin-bottom: 5px;">Bulan: ${formatCapitalizedMonth(
    historyDetail.bulan
  )}</div>
  <div style="font-size: 12px; margin-bottom: 5px;">Wilayah: ${
    historyDetail.wilayah || ""
  }</div>
  <div style="font-size: 12px; margin-bottom: 5px;">Jemaat: ${
    historyDetail.jemaat || ""
  }</div>
  <div style="font-size: 12px; margin-bottom: 5px;">Ketua Jemaat: ${
    historyDetail.ketuaJemaatName || ""
  }</div>
</div>
        
        <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
          <thead>
            <tr>
              <th style="border: 1px solid black; padding: 5px; text-align: center; width: 5%;">NO</th>
              <th style="border: 1px solid black; padding: 5px; text-align: center; width: 75%;">ITEMS</th>
              <th style="border: 1px solid black; padding: 5px; text-align: center; width: 20%;">JUMLAH</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">1</td>
              <td style="border: 1px solid black; padding: 5px;">Jumlah Anggota Jemaat</td>
              <td style="border: 1px solid black; padding: 5px; text-align: center;"></td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 5px;"></td>
              <td style="border: 1px solid black; padding: 5px;">(a). Jumlah Anggota Yang Hadir Sabat Ke-2 Dalam Triwulan Berjalan</td>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">${
                historyDetail.hadirSabat2 || ""
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 5px;"></td>
              <td style="border: 1px solid black; padding: 5px;">(b). Jumlah Anggota Yang Hadir Sabat Ke-7 Dalam Triwulan Berjalan</td>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">${
                historyDetail.hadirSabat7 || ""
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 5px;"></td>
              <td style="border: 1px solid black; padding: 5px;">(c). Jumlah Persentasi Kehadiran Anggota Per Bulan</td>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">${
                historyDetail.persentaseKehadiranBulan || ""
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">2</td>
              <td style="border: 1px solid black; padding: 5px;">Jumlah Perlawatan Kepada Anggota Jemaat (Jiwa)</td>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">${
                historyDetail.perlawatanJemaat || ""
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">3</td>
              <td style="border: 1px solid black; padding: 5px;">Jumlah Perlawatan Kepada Non SDA</td>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">${
                historyDetail.perlawatannonSDA || ""
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">4</td>
              <td style="border: 1px solid black; padding: 5px;">Jumlah Perlawatan Kepada Pendeta/Pemuka Anggota Lainnya</td>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">${
                historyDetail.perlawatanPendeta || ""
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">5</td>
              <td style="border: 1px solid black; padding: 5px;">Jumlah Pelatihan Yang di Ikuti dari UNI/SSD/GC</td>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">${
                historyDetail.pelatihanUNI || ""
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">6</td>
              <td style="border: 1px solid black; padding: 5px;">Jumlah Pelatihan Yang di Ikuti dari Konferens/District</td>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">${
                historyDetail.pelatihanKonferens || ""
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">7</td>
              <td style="border: 1px solid black; padding: 5px;">Jumlah Pelatihan Yang di lakukan Pendeta/Ketua-ketua Jemaat</td>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">${
                historyDetail.pelatihanPendeta || ""
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">8</td>
              <td style="border: 1px solid black; padding: 5px;">Jumlah Kelompok Peduli di Jemaat</td>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">${
                historyDetail.kelompokPeduli || ""
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">9</td>
              <td style="border: 1px solid black; padding: 5px;">Jumlah Tamu Dalam Kelompok Peduli</td>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">${
                historyDetail.tamuKelompokPeduli || ""
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">10</td>
              <td style="border: 1px solid black; padding: 5px;">Jumlah Orang di Berikan Pembelajaran Alkitab Non SDA (Belum di Baptis)</td>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">${
                historyDetail.pembelajaranAlkitab || ""
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">11</td>
              <td style="border: 1px solid black; padding: 5px;">Jumlah KKR Oleh Ketua/Diakon</td>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">${
                historyDetail.jumlahKKR || ""
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">12</td>
              <td style="border: 1px solid black; padding: 5px;">Target Baptisan Jemaat Tahun ini</td>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">${
                historyDetail.targetBaptisan || ""
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">13</td>
              <td style="border: 1px solid black; padding: 5px;">Baptisan Bulan Ini</td>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">${
                historyDetail.baptisanBulanIni || ""
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">14</td>
              <td style="border: 1px solid black; padding: 5px;">Jumlah Mengikuti/Mangadakan Seminar Khotbah</td>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">${
                historyDetail.seminarKhotbah || ""
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">15</td>
              <td style="border: 1px solid black; padding: 5px;">Jumlah Retreat Yang Melibatkan Pendeta Jemaat</td>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">${
                historyDetail.retreatPendeta || ""
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">16</td>
              <td style="border: 1px solid black; padding: 5px;">Jumlah Penanaman Gereja Baru/Ladang Baru</td>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">${
                historyDetail.penanamanGereja || ""
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">17</td>
              <td style="border: 1px solid black; padding: 5px;">Jumlah Ketua Jemaat</td>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">${
                historyDetail.ketuaJemaat || ""
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">18</td>
              <td style="border: 1px solid black; padding: 5px;">Jumlah Diakon</td>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">${
                historyDetail.jumlahDiakon || ""
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">19</td>
              <td style="border: 1px solid black; padding: 5px;">Jumlah Diakones</td>
              <td style="border: 1px solid black; padding: 5px; text-align: center;"></td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 5px;"></td>
              <td style="border: 1px solid black; padding: 5px;">(a). Jumlah Berkhotbah Pada Hari Sabat</td>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">${
                historyDetail.berkhotbahSabat || ""
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 5px;"></td>
              <td style="border: 1px solid black; padding: 5px;">(b). Jumlah Berkhotbah Pada Hari Sabat Ke-7</td>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">${
                historyDetail.berkhotbahSabat7 || ""
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 5px;"></td>
              <td style="border: 1px solid black; padding: 5px;">(c). Jumlah Persentasi Kehadiran Anggota Per Bulan</td>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">${
                historyDetail.persentasiDiakones || ""
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 5px;"></td>
              <td style="border: 1px solid black; padding: 5px;">(d). Jumlah Persembahan</td>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">${
                historyDetail.jumlahPersembahan || ""
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 5px;"></td>
              <td style="border: 1px solid black; padding: 5px;">(e). Jumlah Komite Jemaat (Paling kurang 1 kali dalam sebulan)</td>
              <td style="border: 1px solid black; padding: 5px; text-align: center;">${
                historyDetail.komiteJemaat || ""
              }</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    // Convert the HTML to a canvas
    html2canvas(reportContainer, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
    }).then((canvas) => {
      // Remove the temporary element
      document.body.removeChild(reportContainer);

      // Create PDF
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      // Get dimensions
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add image to PDF
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

      // If the content is too long, adjust scale to fit on one page
      if (imgHeight > 297) {
        // A4 height in mm
        // Recalculate scale to fit on one page
        const scale = 297 / imgHeight;
        pdf.deletePage(1);
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth * scale, 297);
      }

      // Save the PDF
      // Generate filename with pendeta's name
      const fileName = `Laporan_${
        historyDetail.username || "Pendeta"
      }_${formatCapitalizedMonth(historyDetail.bulan)}_${
        historyDetail.tahun
      }.pdf`;
      pdf.save(fileName);
    });
  };

  // // Tambahkan ini di JSX sebelum metadata
  // {role === "SEKRETARIS" && !historyDetail?.valid && (
  //   <div className="mt-8 text-center">
  //     <button
  //       onClick={handleApprove}
  //       disabled={approving}
  //       className={`px-6 py-3 rounded-lg font-semibold text-white ${
  //         approving ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
  //       } transition-colors`}
  //     >
  //       {approving ? "Memproses..." : "Terima Laporan"}
  //     </button>

  //     {error && (
  //       <p className="mt-2 text-red-600">{error}</p>
  //     )}
  //   </div>
  // )}

  const formatCapitalizedMonth = (month: string) => {
    if (!month) return "N/A";
    return month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
  };

  // Priority fields to display first (the 5 required fields with their images)
  const priorityFields = [
    {
      key: "perlawatanJemaat",
      title: "Jumlah Perlawatan Kepada Anggota Jemaat (Jiwa)",
      image: "fotoPerlawatanJemaat",
    },
    {
      key: "perlawatannonSDA",
      title: "Jumlah Perlawatan Kepada Non SDA",
      image: "fotoPerlawatannonSDA",
    },
    {
      key: "perlawatanPendeta",
      title: "Jumlah Perlawatan Kepada Pendeta/Pemuka Anggota Lainnya",
      image: "fotoPerlawatanPendeta",
    },
    {
      key: "baptisanBulanIni",
      title: "Baptisan Bulan Ini",
      image: "fotoBaptisanBulanIni",
    },
    {
      key: "komiteJemaat",
      title: "Jumlah Komite Jemaat (Paling kurang 1 kali dalam sebulan)",
      image: "fotoKomiteJemaat",
    },
  ];

  // Remaining fields to display after priority fields
  const remainingFields = [
    {
      key: "hadirSabat2",
      title: "Anggota yang hadir Sabat ke-2 dalam Triwulan Berjalan",
    },
    {
      key: "hadirSabat7",
      title: "Anggota yang hadir Sabat ke-7 dalam Triwulan Berjalan",
    },
    {
      key: "persentaseKehadiranBulan",
      title: "Persentase Kehadiran Per Bulan",
    },
    { key: "jumlahKKR", title: "Jumlah KKR Oleh Ketua/Diakon" },
    { key: "targetBaptisan", title: "Target Baptisan Jemaat Tahun ini" },
    {
      key: "pelatihanUNI",
      title: "Jumlah Pelatihan Yang di Ikuti dari UNI/SSD/GC",
      image: "fotoPelatihanUNI",
    },
    {
      key: "pelatihanKonferens",
      title: "Jumlah Pelatihan Yang di Ikuti dari Konferens/Disctrict",
      image: "fotoPelatihanKonferens",
    },
    {
      key: "pelatihanPendeta",
      title: "Jumlah Pelatihan Yang di lakukan Pendeta/Ketua-ketua Jemaat",
      image: "fotoPelatihanPendeta",
    },
    {
      key: "kelompokPeduli",
      title: "Jumlah Kelompok Peduli di Jemaat",
      image: "fotoKelompokPeduli",
    },
    {
      key: "tamuKelompokPeduli",
      title: "Jumlah Tamu Dalam Kelompok Peduli",
      image: "fotoTamuKelompok",
    },
    {
      key: "pembelajaranAlkitab",
      title:
        "Jumlah Orang di Berikan Pembelajaran Alkitab Non SDA (Belum di Baptis)",
      image: "fotoPembelajaran",
    },
    {
      key: "seminarKhotbah",
      title: "Jumlah Mengikuti/Mangadakan Seminar Khotbah",
      image: "fotoSeminarKhotbah",
    },
    {
      key: "retreatPendeta",
      title: "Jumlah Retreat Yang Melibatkan Pendeta Jemaat",
    },
    {
      key: "penanamanGereja",
      title: "Jumlah Penanaman Gereja Baru/Ladang Baru",
      image: "fotoPenanamanGereja",
    },
    { key: "ketuaJemaat", title: "Jumlah Ketua Jemaat" },
    { key: "jumlahDiakon", title: "Jumlah Diakon" },
    { key: "berkhotbahSabat", title: "Jumlah Berkhotbah Pada Hari Sabat" },
    {
      key: "berkhotbahSabat7",
      title: "Jumlah Berkhotbah Pada Hari Sabat Ke-7",
    },
    {
      key: "persentasiDiakones",
      title: "Jumlah Persentasi Kehadiran Anggota per Bulan",
    },
    { key: "jumlahPersembahan", title: "Jumlah Persembahan" },
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
            <h1 className="text-3xl font-bold text-yellow-500">
              {historyDetail.username ?? "Unknown"}
            </h1>
            <h2 className="text-2xl font-bold text-green-600 mt-2">
              {formatCapitalizedMonth(historyDetail.bulan)}{" "}
              {historyDetail.tahun}
            </h2>
          </div>

          {role === "SEKRETARIS" && historyDetail?.valid && (
            <div className="mt-8 text-center">
              <button
                onClick={handleDownloadPDF}
                className="flex items-center justify-center px-6 py-3 mx-auto rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors"
              >
                <FileText className="mr-2" size={18} />
                Download Laporan PDF
              </button>
            </div>
          )}

          {role === "SEKRETARIS" && !historyDetail?.valid && (
            <div className="text-right mb-8">
              {" "}
              {/* Added mb-8 for more bottom margin */}
              <button
                onClick={handleApprove}
                disabled={approving}
                className={`px-6 py-3 rounded-lg font-semibold text-white ${
                  approving ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
                } transition-colors`}
              >
                {approving ? "Memproses..." : "Terima Laporan"}
              </button>
              {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
            </div>
          )}

          {/* String Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Jemaat Card */}
            <div className="flex flex-col">
              <div className="bg-green-100 p-4 rounded-t-lg">
                <h3 className="text-green-800 font-medium text-center">
                  Jemaat
                </h3>
              </div>
              <div className="bg-green-500 p-4 rounded-b-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">
                  {historyDetail.jemaat || "..."}
                </span>
              </div>
            </div>

            {/* Wilayah Card */}
            <div className="flex flex-col">
              <div className="bg-green-100 p-4 rounded-t-lg">
                <h3 className="text-green-800 font-medium text-center">
                  Wilayah
                </h3>
              </div>
              <div className="bg-green-500 p-4 rounded-b-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">
                  {historyDetail.wilayah || "..."}
                </span>
              </div>
            </div>

            {/* Ketua Jemaat Name Card */}
            <div className="flex flex-col">
              <div className="bg-green-100 p-4 rounded-t-lg">
                <h3 className="text-green-800 font-medium text-center">
                  Nama Ketua Jemaat
                </h3>
              </div>
              <div className="bg-green-500 p-4 rounded-b-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">
                  {historyDetail.ketuaJemaatName || "..."}
                </span>
              </div>
            </div>
          </div>

          {/* Priority Fields (Top 5 required fields) */}
          <h2 className="text-xl font-bold text-green-700 mb-4">
            Fields Wajib
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {priorityFields.map((field) => {
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

          {/* Remaining Fields */}
          <h2 className="text-xl font-bold text-green-700 mb-4">
            Detail Lainnya
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {remainingFields.map((field) => {
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
