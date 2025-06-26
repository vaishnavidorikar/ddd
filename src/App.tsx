<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Achievements from './pages/Achievements';
import Learning from './pages/Learning';
import Profile from './pages/Profile';
import AuthPage from './components/AuthPage';
import ProtectedRoute from './components/ProtectedRoute';
import { UserProvider } from './context/UserContext';
import { ProgressProvider } from './context/ProgressContext';
import { ThemeProvider } from './context/ThemeContext';

const Home = () => <h1>Home (Protected)</h1>;

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <ProgressProvider>
          <AuthProvider>
            <Router>
              <Routes>
                <Route path="/login" element={<AuthPage />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Layout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="achievements" element={<Achievements />} />
                  <Route path="learning" element={<Learning />} />
                  <Route path="profile" element={<Profile />} />
                </Route>
              </Routes>
            </Router>
          </AuthProvider>
        </ProgressProvider>
      </UserProvider>
    </ThemeProvider>
=======
import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { AuthModal } from './components/AuthModal';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAuthClick={() => setShowAuthModal(true)} />
      
      {user ? (
        <Dashboard />
      ) : (
        <LandingPage onGetStarted={() => setShowAuthModal(true)} />
      )}
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
>>>>>>> c0db8ba (Updated front end codes)
  );
}

export default App;