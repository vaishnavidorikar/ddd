/*
  # Insert Sample Data for Dopamine Learning Dashboard

  1. Sample Courses
    - Various programming and technology courses
    - Different difficulty levels and categories

  2. Sample Achievements
    - Different achievement types and rarities
    - Various XP rewards

  3. Sample Daily Challenges
    - Current and upcoming challenges
*/

-- Insert Sample Courses
INSERT INTO courses (title, description, category, difficulty, total_lessons, estimated_hours, image_url) VALUES
  ('React Fundamentals', 'Master the basics of React including components, props, state, and hooks', 'Frontend', 'Beginner', 20, 15, 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg'),
  ('Advanced JavaScript', 'Deep dive into ES6+, async programming, and modern JavaScript patterns', 'Programming', 'Advanced', 30, 25, 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg'),
  ('Node.js Backend Development', 'Build scalable backend applications with Node.js and Express', 'Backend', 'Intermediate', 25, 20, 'https://images.pexels.com/photos/270373/pexels-photo-270373.jpeg'),
  ('Machine Learning Basics', 'Introduction to ML concepts, algorithms, and Python implementation', 'Data Science', 'Intermediate', 35, 30, 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg'),
  ('CSS Grid & Flexbox Mastery', 'Master modern CSS layout techniques for responsive design', 'Frontend', 'Beginner', 15, 12, 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg'),
  ('Python Data Analysis', 'Learn data manipulation and analysis with pandas and numpy', 'Data Science', 'Intermediate', 28, 22, 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg'),
  ('TypeScript Deep Dive', 'Advanced TypeScript features for large-scale applications', 'Programming', 'Advanced', 22, 18, 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg'),
  ('DevOps with Docker', 'Containerization, orchestration, and deployment strategies', 'DevOps', 'Intermediate', 20, 16, 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg');

-- Insert Sample Achievements
INSERT INTO achievements (title, description, icon, category, requirement_type, requirement_value, xp_reward, rarity) VALUES
  ('First Steps', 'Complete your first lesson', 'Trophy', 'Progress', 'lessons_completed', 1, 50, 'common'),
  ('Week Warrior', 'Maintain a 7-day learning streak', 'Flame', 'Consistency', 'streak_days', 7, 200, 'uncommon'),
  ('Century Club', 'Earn 100 XP in a single day', 'Star', 'Performance', 'daily_xp', 100, 150, 'uncommon'),
  ('Course Crusher', 'Complete 3 courses', 'BookOpen', 'Achievement', 'courses_completed', 3, 500, 'rare'),
  ('Speed Demon', 'Complete 10 lessons in one day', 'Zap', 'Performance', 'daily_lessons', 10, 300, 'rare'),
  ('Dedication Master', 'Maintain a 30-day learning streak', 'Target', 'Consistency', 'streak_days', 30, 1000, 'epic'),
  ('Knowledge Seeker', 'Complete 100 total lessons', 'Brain', 'Progress', 'lessons_completed', 100, 750, 'rare'),
  ('Early Bird', 'Complete lessons before 8 AM for 5 consecutive days', 'Sunrise', 'Habit', 'early_sessions', 5, 400, 'uncommon'),
  ('Night Owl', 'Complete lessons after 10 PM for 5 consecutive days', 'Moon', 'Habit', 'late_sessions', 5, 400, 'uncommon'),
  ('Perfectionist', 'Complete a course with 100% accuracy', 'Award', 'Performance', 'perfect_course', 1, 600, 'epic');

-- Insert Sample Daily Challenges
INSERT INTO daily_challenges (title, description, category, difficulty, xp_reward, active_date) VALUES
  ('Morning Boost', 'Complete 2 lessons before noon', 'Habit', 'Easy', 75, CURRENT_DATE),
  ('Focus Session', 'Study for 45 minutes without breaks', 'Discipline', 'Medium', 150, CURRENT_DATE),
  ('Quick Learner', 'Complete 5 lessons today', 'Progress', 'Medium', 125, CURRENT_DATE),
  ('Streak Builder', 'Maintain your learning streak', 'Consistency', 'Easy', 50, CURRENT_DATE),
  ('Deep Dive', 'Spend 2 hours on a single course', 'Focus', 'Hard', 200, CURRENT_DATE + INTERVAL '1 day'),
  ('Multi-Tasker', 'Study 3 different subjects today', 'Variety', 'Medium', 175, CURRENT_DATE + INTERVAL '1 day'),
  ('Speed Run', 'Complete 8 lessons in under 2 hours', 'Performance', 'Hard', 250, CURRENT_DATE + INTERVAL '2 days'),
  ('Weekend Warrior', 'Complete weekend bonus challenge', 'Special', 'Medium', 300, CURRENT_DATE + INTERVAL '3 days');