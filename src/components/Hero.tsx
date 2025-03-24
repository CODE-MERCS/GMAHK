import React from "react";
import { AlertCircle, BookOpen } from "lucide-react";

const Hero: React.FC = () => {
  return (
<div className="container mx-auto py-10 px-4 min-h-screen flex flex-col justify-center">
{/* Alert Box */}
      <div className="bg-green-100 p-4 rounded-lg mb-8">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <AlertCircle className="h-6 w-6 text-yellow-500" />
          </div>
          <div className="ml-3">
            <p className="text-yellow-700 font-medium">
            Pastikan semua laporan sudah diterima untuk bukti pendeta sudah mengirim laporan dan bisa nemerima gaji
            </p>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Laporan Bulan Ini */}
        <div className="bg-green-100 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-center text-green-700 mb-4">
            Laporan Bulan Ini
          </h2>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-yellow-600 font-medium text-center">
              Cek dan Terima laporan dari pendeta yang sudah mengirim laporan mereka di bulan ini.
            </p>
          </div>
        </div>

        {/* Riwayat */}
        <div className="bg-green-100 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-center text-green-700 mb-4">
            Riwayat
          </h2>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-yellow-600 font-medium text-center">
              Anda dapat melihat laporan pendeta - pendeta yang sudah anda terima di sini.
            </p>
          </div>
        </div>

        {/* Ayat Bulan Ini */}
        <div className="bg-green-100 p-6 rounded-lg">
          <div className="flex justify-center mb-2">
            <BookOpen className="h-8 w-8 text-yellow-600" />
          </div>
          <h2 className="text-xl font-bold text-center text-yellow-600 mb-2">
            Ayat Bulan Ini
          </h2>
          <p className="text-green-800">
            <span className="font-semibold">Yesaya 41:10</span>
            <br />
            janganlah takut, sebab Aku menyertai engkau, janganlah bimbang, sebab Aku ini Allahmu; Aku akan meneguhkan, bahkan akan menolong engkau; Aku akan memegang engkau dengan tangan kanan-Ku yang membawa kemenangan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;