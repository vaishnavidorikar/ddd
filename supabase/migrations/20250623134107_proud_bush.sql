/*
  # Dopamine Learning Dashboard Database Schema

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `name` (text)
      - `avatar_url` (text)
      - `level` (integer, default 1)
      - `xp` (integer, default 0)
      - `streak_count` (integer, default 0)
      - `last_activity_date` (date)
      - `theme_preference` (text, default 'light')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `courses`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `category` (text)
      - `difficulty` (text)
      - `total_lessons` (integer)
      - `estimated_hours` (integer)
      - `image_url` (text)
      - `created_at` (timestamp)

    - `user_courses`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `course_id` (uuid, foreign key)
      - `progress` (integer, default 0)
      - `lessons_completed` (integer, default 0)
      - `status` (text, default 'enrolled')
      - `started_at` (timestamp)
      - `last_accessed` (timestamp)

    - `achievements`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `icon` (text)
      - `category` (text)
      - `requirement_type` (text)
      - `requirement_value` (integer)
      - `xp_reward` (integer)
      - `rarity` (text)

    - `user_achievements`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `achievement_id` (uuid, foreign key)
      - `earned_at` (timestamp)

    - `daily_goals`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `title` (text)
      - `description` (text)
      - `target_value` (integer)
      - `current_value` (integer, default 0)
      - `is_completed` (boolean, default false)
      - `xp_reward` (integer)
      - `date` (date)
      - `created_at` (timestamp)

    - `learning_sessions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `course_id` (uuid, foreign key)
      - `duration_minutes` (integer)
      - `xp_earned` (integer)
      - `lessons_completed` (integer)
      - `session_date` (date)
      - `created_at` (timestamp)

    - `leaderboard`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `weekly_xp` (integer, default 0)
      - `monthly_xp` (integer, default 0)
      - `week_start` (date)
      - `month_start` (date)

    - `daily_challenges`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `category` (text)
      - `difficulty` (text)
      - `xp_reward` (integer)
      - `active_date` (date)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for public read access to courses, achievements, and challenges
*/

-- User Profiles Table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  avatar_url text DEFAULT '',
  level integer DEFAULT 1,
  xp integer DEFAULT 0,
  streak_count integer DEFAULT 0,
  last_activity_date date DEFAULT CURRENT_DATE,
  theme_preference text DEFAULT 'light',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Courses Table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  difficulty text NOT NULL,
  total_lessons integer NOT NULL,
  estimated_hours integer NOT NULL,
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- User Courses Table
CREATE TABLE IF NOT EXISTS user_courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  progress integer DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  lessons_completed integer DEFAULT 0,
  status text DEFAULT 'enrolled',
  started_at timestamptz DEFAULT now(),
  last_accessed timestamptz DEFAULT now()
);

-- Achievements Table
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  category text NOT NULL,
  requirement_type text NOT NULL,
  requirement_value integer NOT NULL,
  xp_reward integer NOT NULL,
  rarity text DEFAULT 'common'
);

-- User Achievements Table
CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  achievement_id uuid REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at timestamptz DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Daily Goals Table
CREATE TABLE IF NOT EXISTS daily_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  target_value integer NOT NULL,
  current_value integer DEFAULT 0,
  is_completed boolean DEFAULT false,
  xp_reward integer NOT NULL,
  date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

-- Learning Sessions Table
CREATE TABLE IF NOT EXISTS learning_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  duration_minutes integer NOT NULL,
  xp_earned integer NOT NULL,
  lessons_completed integer DEFAULT 1,
  session_date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

-- Leaderboard Table
CREATE TABLE IF NOT EXISTS leaderboard (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  weekly_xp integer DEFAULT 0,
  monthly_xp integer DEFAULT 0,
  week_start date DEFAULT date_trunc('week', CURRENT_DATE)::date,
  month_start date DEFAULT date_trunc('month', CURRENT_DATE)::date,
  UNIQUE(user_id, week_start, month_start)
);

-- Daily Challenges Table
CREATE TABLE IF NOT EXISTS daily_challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  difficulty text NOT NULL,
  xp_reward integer NOT NULL,
  active_date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_challenges ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text);

CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = id::text);

-- RLS Policies for courses (public read access)
CREATE POLICY "Courses are publicly readable"
  ON courses
  FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for user_courses
CREATE POLICY "Users can manage their own course enrollments"
  ON user_courses
  FOR ALL
  TO authenticated
  USING (auth.uid()::text = user_id::text);

-- RLS Policies for achievements (public read access)
CREATE POLICY "Achievements are publicly readable"
  ON achievements
  FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for user_achievements
CREATE POLICY "Users can read their own achievements"
  ON user_achievements
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can earn achievements"
  ON user_achievements
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = user_id::text);

-- RLS Policies for daily_goals
CREATE POLICY "Users can manage their own daily goals"
  ON daily_goals
  FOR ALL
  TO authenticated
  USING (auth.uid()::text = user_id::text);

-- RLS Policies for learning_sessions
CREATE POLICY "Users can manage their own learning sessions"
  ON learning_sessions
  FOR ALL
  TO authenticated
  USING (auth.uid()::text = user_id::text);

-- RLS Policies for leaderboard
CREATE POLICY "Users can read leaderboard"
  ON leaderboard
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage their own leaderboard entry"
  ON leaderboard
  FOR ALL
  TO authenticated
  USING (auth.uid()::text = user_id::text);

-- RLS Policies for daily_challenges (public read access)
CREATE POLICY "Daily challenges are publicly readable"
  ON daily_challenges
  FOR SELECT
  TO authenticated
  USING (true);

-- Functions and Triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for user_profiles updated_at
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user() 
RETURNS TRIGGER AS $$
DECLARE
  _name text := COALESCE(NEW.raw_user_meta_data->>'name', 'Anonymous User');
  _email text := COALESCE(NEW.email, '');
BEGIN
  INSERT INTO user_profiles (id, email, name)
  VALUES (NEW.id, _email, _name);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();