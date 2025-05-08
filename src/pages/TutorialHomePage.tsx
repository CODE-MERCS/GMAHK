// pages/TutorialHomePage.tsx
import React from "react";
import TutorialCard from "../components/TutorialCard";
import { Video, FileText, BookOpen } from "lucide-react";

interface TutorialHomePageProps {
  role: string;
}

const TutorialHomePage: React.FC<TutorialHomePageProps> = ({ role }) => {
  // Determine the tutorials to show based on role
  const getTutorialsByRole = () => {
    switch (role) {
      case "PENDETA":
        return [
          {
            id: 1,
            title: "Mengisi Laporan Bulanan",
            description: "Pelajari cara mengisi dan mengirimkan laporan bulanan dengan benar dan efisien.",
            link: "/dashboard/tutorial/laporan",
            icon: <Video size={20} />,
          },
          {
            id: 2,
            title: "Menggunakan Fitur Draft",
            description: "Simpan laporan sebagai draft dan lanjutkan pengisian di lain waktu.",
            link: "/dashboard/tutorial/draft",
            icon: <FileText size={20} />,
          },
          {
            id: 3,
            title: "Melihat History Laporan",
            description: "Cek status dan riwayat laporan yang sudah pernah dikirimkan.",
            link: "/dashboard/tutorial/history",
            icon: <BookOpen size={20} />,
          },
        ];
      case "SEKRETARIS":
        return [
          {
            id: 1,
            title: "Verifikasi Laporan",
            description: "Proses verifikasi dan penerimaan laporan dari pendeta.",
            link: "/sekretaris/tutorial/verifikasi",
            icon: <Video size={20} />,
          },
          {
            id: 2,
            title: "Mengelola Laporan",
            description: "Pelajari cara mengelola laporan yang sudah diterima.",
            link: "/sekretaris/tutorial/kelola",
            icon: <FileText size={20} />,
          },
          {
            id: 3,
            title: "Melihat Statistik",
            description: "Akses dan unduh data statistik dari semua laporan.",
            link: "/sekretaris/tutorial/statistik",
            icon: <BookOpen size={20} />,
          },
        ];
      case "KETUADEPARTEMEN":
        return [
          {
            id: 1,
            title: "Melihat Laporan",
            description: "Lihat dan periksa laporan dari pendeta yang sudah diverifikasi.",
            link: "/ketuadepartemen/tutorial/laporan",
            icon: <Video size={20} />,
          },
          {
            id: 2,
            title: "Filter dan Pencarian",
            description: "Gunakan fitur filter dan pencarian untuk menemukan laporan tertentu.",
            link: "/ketuadepartemen/tutorial/filter",
            icon: <FileText size={20} />,
          },
          {
            id: 3,
            title: "Statistik dan Data",
            description: "Akses statistik dan data historis dari semua laporan.",
            link: "/ketuadepartemen/tutorial/statistik",
            icon: <BookOpen size={20} />,
          },
        ];
      default:
        return [];
    }
  };

  const tutorials = getTutorialsByRole();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-8">
        Tutorial {role === "PENDETA" ? "Pendeta" : role === "SEKRETARIS" ? "Sekretaris" : "Ketua Departemen"}
      </h1>
      
      <div className="bg-green-100 p-4 rounded-lg mb-8">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Video className="h-6 w-6 text-yellow-500" />
          </div>
          <div className="ml-3">
            <p className="text-yellow-700 font-medium">
              Silakan pilih tutorial yang ingin Anda pelajari dari opsi di bawah ini.
              Setiap tutorial berisi video dan penjelasan cara menggunakan fitur sistem.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((tutorial) => (
          <TutorialCard
            key={tutorial.id}
            title={tutorial.title}
            description={tutorial.description}
            link={tutorial.link}
            icon={tutorial.icon}
          />
        ))}
      </div>

      
    </div>
  );
};

export default TutorialHomePage;