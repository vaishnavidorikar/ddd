import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const { signIn, user } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      if (isSignup) {
        // Signup
        const { supabase } = await import('../lib/supabaseClient');
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage('Signup successful! Please check your email to confirm.');
      } else {
        // Login
        await signIn(email, password);
        // Redirect will happen automatically via useEffect when user is set
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>{isSignup ? 'Sign Up' : 'Sign In'}</h2>
        <input
          style={styles.input}
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          required
        />
        <input
          style={styles.input}
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          required
        />
        <button style={styles.button} type="submit">
          {isSignup ? 'Sign Up' : 'Sign In'}
        </button>
        <div style={styles.toggle}>
          {isSignup ? (
            <>
              Already have an account?{' '}
              <span style={styles.link} onClick={() => setIsSignup(false)}>
                Sign In
              </span>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <span style={styles.link} onClick={() => setIsSignup(true)}>
                Sign Up
              </span>
            </>
          )}
        </div>
        {error && <div style={styles.error}>{error}</div>}
        {message && <div style={styles.success}>{message}</div>}
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #ece9f7 0%, #cfd9df 100%)',
  },
  form: {
    background: '#fff',
    padding: '2rem 2.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '320px',
  },
  title: {
    marginBottom: '1.5rem',
    textAlign: 'center',
    color: '#333',
  },
  input: {
    marginBottom: '1rem',
    padding: '0.75rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    padding: '0.75rem',
    borderRadius: '6px',
    border: 'none',
    background: '#6c63ff',
    color: '#fff',
    fontWeight: 600,
    fontSize: '1rem',
    cursor: 'pointer',
    marginBottom: '1rem',
    transition: 'background 0.2s',
  },
  toggle: {
    textAlign: 'center',
    fontSize: '0.95rem',
    marginBottom: '0.5rem',
  },
  link: {
    color: '#6c63ff',
    cursor: 'pointer',
    textDecoration: 'underline',
    marginLeft: '0.25rem',
  },
  error: {
    color: '#d32f2f',
    textAlign: 'center',
    marginTop: '0.5rem',
  },
  success: {
    color: '#388e3c',
    textAlign: 'center',
    marginTop: '0.5rem',
  },
};

export default AuthPage;