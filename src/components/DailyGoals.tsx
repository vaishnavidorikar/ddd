import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Plus, Target } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useUserProfile } from '../hooks/useUserProfile';

interface DailyGoal {
  id: string;
  title: string;
  description: string;
  target_value: number;
  current_value: number;
  is_completed: boolean;
  xp_reward: number;
}

export const DailyGoals: React.FC = () => {
  const { user } = useAuth();
  const { profile, updateProfile } = useUserProfile();
  const [goals, setGoals] = useState<DailyGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalDescription, setNewGoalDescription] = useState('');

  useEffect(() => {
    if (user) {
      fetchDailyGoals();
    }
  }, [user]);

  const fetchDailyGoals = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('daily_goals')
        .select('*')
        .eq('user_id', user?.id)
        .eq('date', today)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setGoals(data || []);

      // If no goals exist, create default ones
      if (!data || data.length === 0) {
        await createDefaultGoals();
      }
    } catch (error) {
      console.error('Error fetching daily goals:', error);
    } finally {
      setLoading(false);
    }
  };

  const createDefaultGoals = async () => {
    const defaultGoals = [
      {
        title: 'Complete 3 lessons',
        description: 'Finish 3 lessons from any course',
        target_value: 3,
        xp_reward: 75,
      },
      {
        title: 'Study for 30 minutes',
        description: 'Spend at least 30 minutes learning',
        target_value: 30,
        xp_reward: 50,
      },
      {
        title: 'Maintain streak',
        description: 'Keep your learning streak alive',
        target_value: 1,
        xp_reward: 25,
      },
    ];

    try {
      const { data, error } = await supabase
        .from('daily_goals')
        .insert(
          defaultGoals.map(goal => ({
            ...goal,
            user_id: user?.id,
            date: new Date().toISOString().split('T')[0],
          }))
        )
        .select();

      if (error) throw error;
      setGoals(data || []);
    } catch (error) {
      console.error('Error creating default goals:', error);
    }
  };

  const toggleGoalCompletion = async (goalId: string, currentCompleted: boolean) => {
    if (!user || !profile) return;

    try {
      const goal = goals.find(g => g.id === goalId);
      if (!goal) return;

      const newCompleted = !currentCompleted;
      const newCurrentValue = newCompleted ? goal.target_value : 0;

      // Update goal completion
      const { error } = await supabase
        .from('daily_goals')
        .update({
          is_completed: newCompleted,
          current_value: newCurrentValue,
        })
        .eq('id', goalId);

      if (error) throw error;

      // Update local state
      setGoals(goals.map(g => 
        g.id === goalId 
          ? { ...g, is_completed: newCompleted, current_value: newCurrentValue }
          : g
      ));

      // Award XP if goal is completed
      if (newCompleted && !currentCompleted) {
        const newXP = profile.xp + goal.xp_reward;
        const newLevel = Math.floor(newXP / 1000) + 1;
        
        await updateProfile({
          xp: newXP,
          level: newLevel,
          last_activity_date: new Date().toISOString().split('T')[0],
        });
      }

    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  const addCustomGoal = async () => {
    if (!user || !newGoalTitle.trim()) return;

    try {
      const { data, error } = await supabase
        .from('daily_goals')
        .insert({
          title: newGoalTitle,
          description: newGoalDescription || 'Custom daily goal',
          target_value: 1,
          current_value: 0,
          is_completed: false,
          xp_reward: 50,
          user_id: user.id,
          date: new Date().toISOString().split('T')[0],
        })
        .select()
        .single();

      if (error) throw error;

      setGoals([...goals, data]);
      setNewGoalTitle('');
      setNewGoalDescription('');
      setShowAddGoal(false);
    } catch (error) {
      console.error('Error adding custom goal:', error);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const completedGoals = goals.filter(goal => goal.is_completed).length;
  const totalGoals = goals.length;
  const completionPercentage = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <Target className="text-indigo-600" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Daily Goals</h3>
            <p className="text-sm text-gray-500">
              {completedGoals} of {totalGoals} completed ({Math.round(completionPercentage)}%)
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowAddGoal(!showAddGoal)}
          className="bg-indigo-50 text-indigo-600 p-2 rounded-lg hover:bg-indigo-100 transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Add new goal form */}
      {showAddGoal && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Goal title"
              value={newGoalTitle}
              onChange={(e) => setNewGoalTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Goal description (optional)"
              value={newGoalDescription}
              onChange={(e) => setNewGoalDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <div className="flex space-x-2">
              <button
                onClick={addCustomGoal}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
              >
                Add Goal
              </button>
              <button
                onClick={() => setShowAddGoal(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Goals list */}
      <div className="space-y-3">
        {goals.map((goal) => (
          <div key={goal.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <button
              onClick={() => toggleGoalCompletion(goal.id, goal.is_completed)}
              className="flex-shrink-0"
            >
              {goal.is_completed ? (
                <CheckCircle2 className="text-green-500" size={24} />
              ) : (
                <Circle className="text-gray-400 hover:text-indigo-500" size={24} />
              )}
            </button>
            <div className="flex-1">
              <h4 className={`font-medium ${goal.is_completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                {goal.title}
              </h4>
              <p className="text-sm text-gray-500">{goal.description}</p>
            </div>
            <div className="text-sm text-amber-600 font-medium">
              +{goal.xp_reward} XP
            </div>
          </div>
        ))}
      </div>

      {goals.length === 0 && (
        <div className="text-center py-8">
          <Target className="mx-auto text-gray-400 mb-3" size={48} />
          <p className="text-gray-500">No daily goals yet. Add your first goal!</p>
        </div>
      )}
    </div>
  );
};