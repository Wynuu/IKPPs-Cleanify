import React from 'react';
import Header from '../components/Header';
import TaskCard from '../components/TaskCard';

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <Header />

      {/* Welcome Section */}
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">Hi, Welcome</h1>
        <p className="text-gray-600">Selamat Malam</p>
      </div>

      {/* Task Categories */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Tugas</h2>
        <div className="grid grid-cols-2 gap-4">
          <TaskCard
            title="Mengembangkan Prototipe Baru"
            description="Deskripsi tugas 1"
            dueDate="11-09-2024"
          />
          <TaskCard
            title="Membuat Proposal Penelitian Baru"
            description="Deskripsi tugas 2"
            dueDate="01-10-2024"
          />
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Tenggat Waktu Terdekat</h2>
        <div className="space-y-4">
          <TaskCard
            title="Mengembangkan Prototipe Baru"
            description="Deskripsi tugas 1"
            dueDate="11-09-2024"
          />
          <TaskCard
            title="Membuat Proposal Penelitian Baru"
            description="Deskripsi tugas 2"
            dueDate="01-10-2024"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;