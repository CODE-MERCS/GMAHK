// components/Footer/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-800 py-8 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <p>© {new Date().getFullYear()} GMAHK.</p>
      </div>
    </footer>
  );
};

export default Footer;
