import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Welcome back, {user?.name || 'Admin'} 👋
      </h1>
      <p className="text-gray-500 dark:text-gray-400">
        Use the sidebar to manage your portfolio content.
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {['Projects', 'Skills', 'Experience', 'Messages'].map((item) => (
          <div key={item} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{item}</p>
            <p className="mt-2 text-3xl font-bold text-indigo-600 dark:text-indigo-400">—</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
