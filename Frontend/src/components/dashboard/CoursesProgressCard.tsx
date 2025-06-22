// CoursesProgressCard.tsx

import React from 'react';
import { BookOpen } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export interface Course {
  id: string;
  title: string;
  category: string;
  progress: number;
  thumbnail: string;
}

interface CoursesProgressCardProps {
  courses: Course[];
}

export const CoursesProgressCard: React.FC<CoursesProgressCardProps> = ({ courses }) => {
  const { darkMode } = useTheme();

  return (
    <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md h-full`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Course Progress</h2>
        <BookOpen className="text-indigo-500" size={20} />
      </div>

      <div className="space-y-4">
        {courses.slice(0, 3).map((course) => (
          <div
            key={course.id}
            className={`flex items-center p-3 rounded-lg transition-colors ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0 bg-gray-200">
              <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover" />
            </div>

            <div className="ml-3 flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {course.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{course.category}</p>
                </div>
                <span
                  className={`text-sm font-medium ${
                    course.progress === 100
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-indigo-600 dark:text-indigo-400'
                  }`}
                >
                  {course.progress}%
                </span>
              </div>

              <div className="mt-1 w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    course.progress === 100 ? 'bg-green-500' : 'bg-indigo-500'
                  }`}
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-6 w-full px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-md hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors">
        View All Courses
      </button>
    </div>
  );
};
