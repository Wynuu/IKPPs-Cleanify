interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div className="p-4 border rounded-xl bg-white shadow">
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
      <p className="text-xs mt-2">
        Status:{" "}
        <span className={task.completed ? "text-green-600" : "text-red-600"}>
          {task.completed ? "Selesai" : "Belum"}
        </span>
      </p>
    </div>
  );
};

export default TaskCard;