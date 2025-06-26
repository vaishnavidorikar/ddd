import React, { useState } from 'react';
import { Brain, User, LogOut, Settings, Moon, Sun, Database } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useUserProfile } from '../hooks/useUserProfile';

interface HeaderProps {
  onAuthClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAuthClick }) => {
  const { user, signOut, isConfigured } = useAuth();
  const { profile } = useUserProfile();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // You can implement theme switching logic here
  };

  const handleSupabaseSetup = () => {
    window.open('https://supabase.com/dashboard', '_blank');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Brain className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">LearnFlow</h1>
              <p className="text-xs text-gray-500">Dopamine-Driven Learning</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {!isConfigured && (
              <button
                onClick={handleSupabaseSetup}
                className="bg-amber-100 text-amber-800 px-3 py-2 rounded-lg hover:bg-amber-200 transition-colors font-medium text-sm flex items-center space-x-2"
              >
                <Database size={16} />
                <span>Connect to Supabase</span>
              </button>
            )}

            {user && profile ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 bg-gray-50 rounded-full px-3 py-2 hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {profile.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">{profile.name}</p>
                    <p className="text-xs text-gray-500">Level {profile.level}</p>
                  </div>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{profile.name}</p>
                      <p className="text-xs text-gray-500">{profile.email}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>Level {profile.level}</span>
                        <span>{profile.xp} XP</span>
                        <span>{profile.streak_count} day streak</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={toggleTheme}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                    >
                      {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                      <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                    </button>
                    
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                      <Settings size={16} />
                      <span>Settings</span>
                    </button>
                    
                    <button
                      onClick={handleSignOut}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                    >
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};