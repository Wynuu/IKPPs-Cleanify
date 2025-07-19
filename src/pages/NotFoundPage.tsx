import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">SILAHKAN LOGIN ULANG</h1>
      <p className="text-gray-600 mb-4">Akun anda belum terdaftar.</p>
      <Link to="/" className="text-blue-500 underline">
        Kembali ke login
      </Link>
    </div>
  );
};

export default NotFoundPage;