// pages/TutorialSekretaris.tsx
import React from "react";
import VideoPlayer from "../components/VideoPlayer";
import { Video, FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TutorialSekretaris = () => {
  // Tutorial untuk sekretaris
  const tutorials = [
    {
      id: 1,
      title: "Cara Menerima dan Memverifikasi Laporan",
      videoSrc: "/videos/4.mP4",
    },

    {
      id: 3,
      title: "Melihat dan Mengunduh Laporan",
      videoSrc: "/videos/5.mP4",
    },
  ];

  return (
    <div className="p-6">
      <Link to="/sekretaris" className="flex items-center text-green-600 mb-6">
        <ArrowLeft className="mr-2" size={20} />
        Kembali ke Dashboard
      </Link>
      
      <h1 className="text-3xl font-bold text-green-700 mb-8">
        Tutorial Sekretaris
      </h1>
      
      <div className="bg-green-100 p-4 rounded-lg mb-8">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Video className="h-6 w-6 text-yellow-500" />
          </div>
          <div className="ml-3">
            <p className="text-yellow-700 font-medium">
              Video tutorial berikut menjelaskan cara menggunakan sistem pelaporan untuk Sekretaris.
              Pelajari cara memverifikasi, menerima, dan mengelola laporan pendeta.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {tutorials.map((tutorial) => (
          <VideoPlayer
            key={tutorial.id}
            title={tutorial.title}
            src={tutorial.videoSrc}
          />
        ))}
      </div>

      
    </div>
  );
};

export default TutorialSekretaris;