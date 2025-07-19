import React, { useState } from 'react';

const ProfileForm: React.FC = () => {
  const [name, setName] = useState('');
  const [nik, setNik] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile updated:', { name, nik });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Edit Profil</h1>
      <input
        type="text"
        placeholder="Nama Lengkap"
        className="w-full p-2 border rounded mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="NIK"
        className="w-full p-2 border rounded mb-4"
        value={nik}
        onChange={(e) => setNik(e.target.value)}
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Simpan
      </button>
    </form>
  );
};

export default ProfileForm;