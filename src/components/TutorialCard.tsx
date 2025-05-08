// components/TutorialCard.tsx
import React from "react";
import { Link } from "react-router-dom";

interface TutorialCardProps {
  title: string;
  description: string;
  link: string;
  icon?: React.ReactNode;
}

const TutorialCard: React.FC<TutorialCardProps> = ({
  title,
  description,
  link,
  icon,
}) => {
  return (
    <Link
      to={link}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
    >
      <div className="bg-green-600 p-4 text-white flex justify-center items-center">
        {icon && <div className="mr-2">{icon}</div>}
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      <div className="p-4 flex-grow">
        <p className="text-gray-700">{description}</p>
      </div>
      <div className="bg-green-50 p-3 text-center text-sm text-green-600 hover:bg-green-100 transition-colors">
        Lihat Tutorial
      </div>
    </Link>
  );
};

export default TutorialCard;