import React from "react";
import { AlertCircle, BookOpen } from "lucide-react";

const Hero: React.FC = () => {
  return (
    // Reduced padding and removed min-h-screen to make component more compact
    <div className="container mx-auto py-4 px-4 flex flex-col justify-center">

      {/* Alert Box - Reduced margin-bottom from mb-8 to mb-4 */}
      <div className="bg-green-100 p-3 rounded-lg mb-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="ml-3">
            <p className="text-yellow-700 font-medium">
              Pastikan semua laporan sudah diterima untuk bukti pendeta sudah
              mengirim laporan dan bisa nemerima gaji
            </p>
          </div>
        </div>
      </div>

      {/* Content Grid - Reduced gap from gap-6 to gap-4 */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Laporan Bulan Ini - Reduced padding from p-6 to p-4 */}
        <div className="bg-green-100 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-center text-yellow-600 mb-3">
            Laporan Bulan Ini
          </h2>
          <p className="text-green-800">
            Cek dan Terima laporan dari pendeta yang sudah mengirim laporan
            mereka di bulan ini.
          </p>
        </div>

        {/* Riwayat - Reduced padding from p-6 to p-4 */}
        <div className="bg-green-100 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-center text-yellow-600 mb-3">
            Riwayat
          </h2>
          <p className="text-green-800">
            Anda dapat melihat laporan pendeta - pendeta yang sudah anda terima
            di sini.
          </p>
        </div>

        {/* Ayat Bulan Ini - Reduced padding from p-6 to p-4 */}
        <div className="bg-green-100 p-4 rounded-lg">
          <div className="flex justify-center mb-1">
            <BookOpen className="h-7 w-7 text-yellow-600" />
          </div>
          <h2 className="text-xl font-bold text-center text-yellow-600 mb-1">
            Ayat Bulan Ini
          </h2>
          <p className="text-green-800">
            <span className="font-semibold">Yesaya 41:10</span>
            <br />
            janganlah takut, sebab Aku menyertai engkau, janganlah bimbang,
            sebab Aku ini Allahmu; Aku akan meneguhkan, bahkan akan menolong
            engkau; Aku akan memegang engkau dengan tangan kanan-Ku yang membawa
            kemenangan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;