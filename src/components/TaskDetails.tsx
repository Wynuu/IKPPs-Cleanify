import React from 'react';

interface TaskDetailsProps {
  title: string;
  description: string;
  createdDate: string;
  dueDate: string;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ title, description, createdDate, dueDate }) => {
  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h1 className="text-xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-2">{description}</p>
      <p className="text-sm text-gray-500">Dibuat: {createdDate}</p>
      <p className="text-sm text-gray-500">Batas Waktu: {dueDate}</p>
    </div>
  );
};

export default TaskDetails;