interface UserPerformance {
  id: string;
  name: string;
  nik: string;
  performance: number;
}

interface PerformanceCardProps {
  user: UserPerformance;
}

const PerformanceCard: React.FC<PerformanceCardProps> = ({ user }) => {
  return (
    <div className="p-4 rounded-xl shadow bg-white">
      <h3 className="font-semibold">{user.name}</h3>
      <p className="text-sm text-gray-500">NIK: {user.nik}</p>
      <p className="mt-2 text-sm">
        Performa: <span className="font-bold">{user.performance}%</span>
      </p>
    </div>
  );
};

export default PerformanceCard;