import React, { useState } from 'react';
import { Target, CheckCircle, Plus, Minus } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface DailyGoalCardProps {
  completed: number;
  total: number;
}

const DailyGoalCard: React.FC<DailyGoalCardProps> = ({ completed: initialCompleted, total: initialTotal }) => {
  const { darkMode } = useTheme();
  const [completed, setCompleted] = useState(initialCompleted);
  const [total, setTotal] = useState(initialTotal);

  const progress = Math.round((completed / total) * 100);

  const handleAddGoal = () => setTotal((prev) => prev + 1);
  const handleRemoveGoal = () => setTotal((prev) => Math.max(1, prev - 1));

  return (
    <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Daily Goals</h2>
        <Target className="text-indigo-500" size={20} />
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <button onClick={handleAddGoal} className="p-1 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300">
            <Plus size={16} />
          </button>
          <button onClick={handleRemoveGoal} className="p-1 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300">
            <Minus size={16} />
          </button>
        </div>
        <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{completed}/{total}</span>
      </div>

      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-indigo-500" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="mt-4 space-y-3">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className="flex items-center">
            <div className={`flex-shrink-0 ${i < completed ? 'text-green-500' : 'text-gray-300 dark:text-gray-600'}`}>
              <CheckCircle size={18} />
            </div>
            <span className={`ml-3 text-sm ${i < completed ? 'text-gray-600 dark:text-gray-300 line-through' : 'text-gray-900 dark:text-white font-medium'}`}>
              {i < completed ? `Completed goal #${i + 1}` : i === completed ? 'Solve 5 medium problems' : 'Study for 30 minutes'}
            </span>
          </div>
        ))}
      </div>

      {completed === total ? (
        <div className="mt-6 px-4 py-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
          <div className="flex items-center">
            <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={16} />
            <p className="text-sm text-green-800 dark:text-green-300">
              Awesome! You've completed all your daily goals.
            </p>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setCompleted((prev) => Math.min(total, prev + 1))} 
          className="mt-6 w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors"
        >
          Start Next Goal
        </button>
      )}
    </div>
  );
};

export default DailyGoalCard;