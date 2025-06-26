import React, { useState } from 'react';
import { Play, Clock, BarChart3, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useUserProfile } from '../hooks/useUserProfile';

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    category: string;
    difficulty: string;
    total_lessons: number;
    estimated_hours: number;
    image_url: string;
  };
  userCourse?: {
    progress: number;
    lessons_completed: number;
    status: string;
  };
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, userCourse }) => {
  const { user } = useAuth();
  const { profile, updateProfile } = useUserProfile();
  const [loading, setLoading] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleContinue = async () => {
    if (!user || !profile) return;

    setLoading(true);
    try {
      // Simulate lesson completion and XP gain
      const xpGained = 25;
      const newLessonsCompleted = (userCourse?.lessons_completed || 0) + 1;
      const newProgress = Math.min(100, Math.round((newLessonsCompleted / course.total_lessons) * 100));

      // Update user course progress
      if (userCourse) {
        await supabase
          .from('user_courses')
          .update({
            progress: newProgress,
            lessons_completed: newLessonsCompleted,
            last_accessed: new Date().toISOString(),
          })
          .eq('user_id', user.id)
          .eq('course_id', course.id);
      } else {
        // Enroll user in course
        await supabase
          .from('user_courses')
          .insert({
            user_id: user.id,
            course_id: course.id,
            progress: Math.round((1 / course.total_lessons) * 100),
            lessons_completed: 1,
          });
      }

      // Update user profile XP and level
      const newXP = profile.xp + xpGained;
      const newLevel = Math.floor(newXP / 1000) + 1;
      
      await updateProfile({
        xp: newXP,
        level: newLevel,
        last_activity_date: new Date().toISOString().split('T')[0],
      });

      // Show success feedback (you can add a toast notification here)
      console.log(`Gained ${xpGained} XP! New total: ${newXP}`);
      
    } catch (error) {
      console.error('Error updating course progress:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200">
      <div className="relative">
        <img
          src={course.image_url}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
            {course.difficulty}
          </span>
        </div>
        {userCourse && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2">
              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                <span>Progress</span>
                <span>{userCourse.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${userCourse.progress}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
            {course.category}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="text-yellow-500" size={14} />
            <span className="text-sm text-gray-600">4.8</span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <BarChart3 size={14} />
            <span>{course.total_lessons} lessons</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock size={14} />
            <span>{course.estimated_hours}h</span>
          </div>
        </div>

        <button
          onClick={handleContinue}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play size={16} />
          <span>{loading ? 'Loading...' : (userCourse ? 'Continue' : 'Start Course')}</span>
        </button>
      </div>
    </div>
  );
};