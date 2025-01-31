import React from "react";

const Hero: React.FC = () => {
  return (
    <section
      className="relative h-screen flex flex-col justify-center items-center text-center px-6 sm:px-12 lg:px-20"
      style={{
        backgroundImage: "url('gereja.png')", // Foto sebagai background
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // Efek Parallax
      }}
    >
      {/* Overlay Gelap untuk Kontras */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Konten Hero */}
      <div className="relative max-w-4xl px-6 text-white animate-fade-in">
        <h1 className="text-6xl font-extrabold drop-shadow-lg">
          Selamat Datang di <span className="text-yellow-400">GMAHK</span>
        </h1>
        <p className="text-lg mt-5 leading-relaxed max-w-3xl mx-auto">
          Kami hadir untuk melayani, berbagi kasih, dan menyampaikan kabar baik kepada semua orang.
        </p>
      </div>

      {/* Bagian Visi & Misi */}
      <div className="relative max-w-6xl mx-auto mt-16 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg">
          {/* Visi */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-3xl font-semibold text-yellow-400 mb-4 flex items-center gap-2">
              ✨ Visi
            </h3>
            <p className="text-gray-200 leading-relaxed">
              Selaras dengan wahyu Alkitab, Gereja Masehi Advent Hari Ketujuh melihat sebagai
              klimaks dari rencana Allah untuk memulihkan segenap ciptaan-Nya agar selaras dengan
              kehendak-Nya.
            </p>
          </div>

          {/* Misi */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <h3 className="text-3xl font-semibold text-yellow-400 mb-4 flex items-center gap-2">
              🌍 Misi
            </h3>
            <p className="text-gray-200 leading-relaxed">
              Menjadikan murid Yesus Kristus, yang hidup sebagai saksi-Nya yang penuh kasih
              dan memberitakan kepada semua orang Injil yang kekal dari Pekabaran Tiga Malaikat
              (Matius 28:18–20).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
