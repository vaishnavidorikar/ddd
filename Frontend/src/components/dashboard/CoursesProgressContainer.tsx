// CoursesProgressContainer.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CoursesProgressCard, type Course } from './CoursesProgressCard';

const CoursesProgressContainer: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  axios.get<Course[]>('http://localhost:40001/api/courses')
    .then((res) => {
      setCourses(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching course progress:", err);
      setLoading(false);
    });
}, []);

  if (loading) return <p>Loading courses...</p>;

  return <CoursesProgressCard courses={courses} />;
};

export default CoursesProgressContainer;
