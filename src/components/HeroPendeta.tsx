import React from "react";
import { AlertCircle, BookOpen } from "lucide-react";

const HeroPendeta: React.FC = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      {/* Alert Box */}
      <div className="bg-green-100 p-4 rounded-lg mb-8">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <AlertCircle className="h-6 w-6 text-yellow-500" />
          </div>
          <div className="ml-3">
            <p className="text-yellow-700 font-medium">
              Wajib memberikan laporan bulanan untuk menerima slip gaji.
              Laporan sudah bisa dikumpulkan 3 hari terakhir sebelum perpindahan bulan dan 3 hari
              setelah perpindahan bulan.
            </p>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Ayat Bulan Ini */}
        <div className="bg-green-100 p-6 rounded-lg">
          <div className="flex justify-center mb-4">
            <BookOpen className="h-12 w-12 text-green-700" />
          </div>
          <h2 className="text-xl font-bold text-center text-yellow-600 mb-4">
            Ayat Bulan Ini
          </h2>
          <p className="text-green-800">
            <span className="font-semibold">Yesaya 41:10</span>
            <br />
            janganlah takut, sebab Aku menyertai engkau, janganlah bimbang, sebab Aku ini Allahmu; Aku akan meneguhkan, bahkan akan menolong engkau; Aku akan memegang engkau dengan tangan kanan-Ku yang membawa kemenangan.
          </p>
        </div>

        {/* Visi */}
        <div className="bg-green-100 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-center text-yellow-600 mb-4">
            Visi
          </h2>
          <p className="text-green-800 text-center">
            Selaras dengan wahyu Alkitab, Gereja Masehi Advent Hari Ketujuh melihat sebagai klimaks dari rencana Allah untuk memulihkan segenap ciptaan-Nya agar selaras dengan kehendak-Nya.
          </p>
        </div>

        {/* Misi */}
        <div className="bg-green-100 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-center text-yellow-600 mb-4">
            Misi
          </h2>
          <p className="text-green-800 text-center">
            Menjadikan murid Yesus Kristus, yang hidup sebagai saksi-Nya yang penuh kasih dan memberitakan kepada semua orang Injil yang kekal dari Pekabaran Tiga Malaikat (Matius 28:18-20).
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroPendeta;