import React from 'react';

interface Props {
  message: string;
  onClose: () => void;
}

const NotificationCard: React.FC<Props> = ({ message, onClose }) => {
  return (
    <div className="bg-yellow-200 p-4 rounded shadow mb-4">
      <div className="flex justify-between items-center">
        <span className="text-gray-800">{message}</span>
        <button onClick={onClose} className="text-red-500 font-bold">×</button>
      </div>
    </div>
  );
};

export default NotificationCard;