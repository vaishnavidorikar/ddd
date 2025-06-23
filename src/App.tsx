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
  );
}

export default App;