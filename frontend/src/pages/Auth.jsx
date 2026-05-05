import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    let result;
    if (isRegistering) {
      // Create a new account
      result = await supabase.auth.signUp({ email, password });
    } else {
      // Login to existing account
      result = await supabase.auth.signInWithPassword({ email, password });
    }

    const { error } = result;
    if (error) {
      alert(error.message);
    } else if (isRegistering) {
      alert('Success! Check your email for a confirmation link.');
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>{isRegistering ? 'Create Account' : 'Welcome Back'}</h2>
        <p>{isRegistering ? 'Sign up to start exploring' : 'Login to view the map'}</p>
        
        <form onSubmit={handleAuth}>
          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button className="auth-btn" disabled={loading}>
            {loading ? 'Processing...' : isRegistering ? 'Register' : 'Login'}
          </button>
        </form>

        <button 
          className="toggle-btn" 
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
        </button>
      </div>
    </div>
  );
}