import React from 'react';
import ProfileForm from '../components/ProfileForm';

const ProfilePage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <ProfileForm />
    </div>
  );
};

export default ProfilePage;