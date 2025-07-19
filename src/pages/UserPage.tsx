import React from 'react';
import UserDashboard from '../components/UserDashboard';

const UserPage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <UserDashboard />
    </div>
  );
};

export default UserPage;