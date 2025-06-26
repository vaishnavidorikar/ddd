import React from 'react';
import { Trophy, Flame, Target, BookOpen } from 'lucide-react';
import { useUserProfile } from '../hooks/useUserProfile';

export const StatsCards: React.FC = () => {
  const { profile } = useUserProfile();

  if (!profile) return null;

  const stats = [
    {
      title: 'Total XP',
      value: profile.xp.toLocaleString(),
      icon: Trophy,
      color: 'bg-amber-500',
      textColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      title: 'Current Streak',
      value: `${profile.streak_count} days`,
      icon: Flame,
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Current Level',
      value: profile.level.toString(),
      icon: Target,
      color: 'bg-indigo-500',
      textColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      title: 'Courses Active',
      value: '3',
      icon: BookOpen,
      color: 'bg-teal-500',
      textColor: 'text-teal-600',
      bgColor: 'bg-teal-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
              <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
            </div>
            <div className={`${stat.bgColor} p-3 rounded-lg`}>
              <stat.icon className={stat.textColor} size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};