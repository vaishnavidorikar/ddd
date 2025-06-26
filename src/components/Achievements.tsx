import React, { useState, useEffect } from 'react';
import { Award, Trophy, Star, Zap, Target, BookOpen, Flame, Brain } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  requirement_type: string;
  requirement_value: number;
  xp_reward: number;
  rarity: string;
  earned_at?: string;
}

export const Achievements: React.FC = () => {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchAchievements();
    }
  }, [user]);

  const fetchAchievements = async () => {
    try {
      // Fetch all achievements
      const { data: allAchievements, error: achievementsError } = await supabase
        .from('achievements')
        .select('*')
        .order('rarity', { ascending: true });

      if (achievementsError) throw achievementsError;

      // Fetch user's earned achievements
      const { data: userAchievementsData, error: userAchievementsError } = await supabase
        .from('user_achievements')
        .select('achievement_id, earned_at')
        .eq('user_id', user?.id);

      if (userAchievementsError) throw userAchievementsError;

      const earnedIds = new Set(userAchievementsData?.map(ua => ua.achievement_id) || []);
      
      setAchievements(allAchievements || []);
      setUserAchievements(earnedIds);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      Trophy,
      Star,
      Zap,
      Target,
      BookOpen,
      Flame,
      Brain,
      Award,
    };
    return icons[iconName] || Trophy;
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'common':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'uncommon':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rare':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'epic':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'legendary':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const earnedAchievements = achievements.filter(a => userAchievements.has(a.id));
  const unearned = achievements.filter(a => !userAchievements.has(a.id));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-amber-100 p-2 rounded-lg">
            <Award className="text-amber-600" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
            <p className="text-sm text-gray-500">
              {earnedAchievements.length} of {achievements.length} unlocked
            </p>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-amber-500 h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${achievements.length > 0 ? (earnedAchievements.length / achievements.length) * 100 : 0}%` 
            }}
          />
        </div>
      </div>

      {/* Earned achievements */}
      {earnedAchievements.length > 0 && (
        <div className="mb-6">
          <h4 className="text-md font-medium text-gray-900 mb-3">Unlocked</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {earnedAchievements.map((achievement) => {
              const IconComponent = getIconComponent(achievement.icon);
              return (
                <div
                  key={achievement.id}
                  className="flex items-center space-x-3 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg"
                >
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <IconComponent className="text-amber-600" size={20} />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900">{achievement.title}</h5>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full border ${getRarityColor(achievement.rarity)}`}>
                        {achievement.rarity}
                      </span>
                      <span className="text-xs text-amber-600 font-medium">
                        +{achievement.xp_reward} XP
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Unearned achievements */}
      {unearned.length > 0 && (
        <div>
          <h4 className="text-md font-medium text-gray-900 mb-3">Available</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unearned.slice(0, 6).map((achievement) => {
              const IconComponent = getIconComponent(achievement.icon);
              return (
                <div
                  key={achievement.id}
                  className="flex items-center space-x-3 p-4 bg-gray-50 border border-gray-200 rounded-lg opacity-75"
                >
                  <div className="bg-gray-200 p-2 rounded-lg">
                    <IconComponent className="text-gray-500" size={20} />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-700">{achievement.title}</h5>
                    <p className="text-sm text-gray-500">{achievement.description}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full border ${getRarityColor(achievement.rarity)}`}>
                        {achievement.rarity}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">
                        +{achievement.xp_reward} XP
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {achievements.length === 0 && (
        <div className="text-center py-8">
          <Award className="mx-auto text-gray-400 mb-3" size={48} />
          <p className="text-gray-500">No achievements available yet.</p>
        </div>
      )}
    </div>
  );
};