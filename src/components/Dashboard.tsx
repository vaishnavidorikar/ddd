import React, { useState, useEffect } from 'react';
import { StatsCards } from './StatsCards';
import { ProgressChart } from './ProgressChart';
import { CourseCard } from './CourseCard';
import { DailyGoals } from './DailyGoals';
import { Achievements } from './Achievements';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  total_lessons: number;
  estimated_hours: number;
  image_url: string;
}

interface UserCourse {
  course_id: string;
  progress: number;
  lessons_completed: number;
  status: string;
}

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [userCourses, setUserCourses] = useState<{ [key: string]: UserCourse }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      // Fetch courses
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (coursesError) throw coursesError;

      // Fetch user's enrolled courses
      const { data: userCoursesData, error: userCoursesError } = await supabase
        .from('user_courses')
        .select('*')
        .eq('user_id', user?.id);

      if (userCoursesError) throw userCoursesError;

      // Convert user courses to lookup object
      const userCoursesLookup = (userCoursesData || []).reduce((acc: { [key: string]: UserCourse }, uc) => {
        acc[uc.course_id] = uc;
        return acc;
      }, {});

      setCourses(coursesData || []);
      setUserCourses(userCoursesLookup);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="h-80 bg-gray-200 rounded-xl"></div>
              <div className="h-96 bg-gray-200 rounded-xl"></div>
            </div>
            <div className="space-y-8">
              <div className="h-80 bg-gray-200 rounded-xl"></div>
              <div className="h-96 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const enrolledCourses = courses.filter(course => userCourses[course.id]);
  const recommendedCourses = courses.filter(course => !userCourses[course.id]).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
        <p className="text-gray-600">Let's continue your learning journey and reach new milestones.</p>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ProgressChart />
          
          {/* Current Courses */}
          {enrolledCourses.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Continue Learning</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enrolledCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    userCourse={userCourses[course.id]}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Recommended Courses */}
          {recommendedCourses.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {enrolledCourses.length > 0 ? 'Recommended for You' : 'Start Your Journey'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendedCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <DailyGoals />
          <Achievements />
        </div>
      </div>
    </div>
  );
};