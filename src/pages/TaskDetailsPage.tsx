import React from 'react';
import TaskDetails from '../components/TaskDetails';

const TaskDetailsPage: React.FC = () => {
  return (
    <div>
      <TaskDetails
        title="Membuat Proposal Penelitian Baru"
        description="Membuat proposal penelitian baru untuk proyek mendatang."
        createdDate="01-09-2024"
        dueDate="01-10-2024"
      />
    </div>
  );
};

export default TaskDetailsPage;