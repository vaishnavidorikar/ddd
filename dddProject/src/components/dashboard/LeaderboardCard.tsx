import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Trophy, Timer, BookOpen, Activity, Flame } from 'lucide-react';

interface LeaderboardEntry {
  id: number;
  name: string;
  avatar: string;
  courses: number;
  timeSpent: number; // in hours
  quizzes: number;
  score: number;
  streak: number;
}

interface LeaderBoardProps {
  data: LeaderboardEntry[];
  metric: 'courses' | 'timeSpent' | 'quizzes' | 'score' | 'streak';
}

const metricIcons = {
  courses: <BookOpen size={18} className="text-indigo-500" />,
  timeSpent: <Timer size={18} className="text-blue-500" />,
  quizzes: <Activity size={18} className="text-pink-500" />,
  score: <Trophy size={18} className="text-yellow-500" />,
  streak: <Flame size={18} className="text-red-500" />,
};

const metricLabels = {
  courses: 'Courses Completed',
  timeSpent: 'Hours Spent',
  quizzes: 'Quizzes Taken',
  score: 'Total Score',
  streak: 'Current Streak',
};

const LeaderBoard: React.FC<LeaderBoardProps> = ({ data, metric }) => {
  const { darkMode } = useTheme();
  const sorted = [...data].sort((a, b) => b[metric] - a[metric]).slice(0, 5);

  return (
    <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Leaderboard - {metricLabels[metric]}
        </h2>
        {metricIcons[metric]}
      </div>

      <div className="space-y-4">
        {sorted.map((entry, index) => (
          <div key={entry.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={entry.avatar}
                alt={entry.name}
                className="w-10 h-10 rounded-full object-cover border"
              />
              <div className="ml-3">
                <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{entry.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Rank #{index + 1}</p>
              </div>
            </div>
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              {entry[metric]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard;