import React from "react";
import { AlertCircle, BookOpen } from "lucide-react";

const Hero = () => {
  return (
    <div className="container mx-auto py-4 px-4">
      {/* Alert Box */}
      <div className="bg-green-100 p-4 rounded-lg mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <AlertCircle className="h-6 w-6 text-yellow-500" />
          </div>
          <div className="ml-3">
            <p className="text-yellow-700 font-medium">
              Untuk informasi seputar laporan silahkan melakukan kontak dengan sekretaris
            </p>
          </div>
        </div>
      </div>

      {/* Centered Content Cards */}
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-6">
        {/* Lihat Laporan */}
        <div className="bg-green-100 p-6 rounded-lg w-full md:w-1/3">
          <h2 className="text-xl font-bold text-center text-yellow-600 mb-4">
            Lihat Laporan 
          </h2>
          <p className="text-green-800">
            Anda dapat melihat laporan yang sudah dikumpulkan pendeta berdasarkan tahun dan bulan pengumpulan
          </p>
        </div>

        {/* Ayat Bulan Ini */}
        <div className="bg-green-100 p-6 rounded-lg w-full md:w-1/3">
          <div className="flex justify-center mb-2">
            <BookOpen className="h-8 w-8 text-yellow-600" />
          </div>
          <h2 className="text-xl font-bold text-center text-yellow-600 mb-2">
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
