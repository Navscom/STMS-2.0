import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Auth from './pages/Auth';
import Home from './pages/Home';

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // 1. Check if a user is already signed in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // 2. Listen for login/logout events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Show Auth page if no session, otherwise show the Home/Map page
  return (
    <div className="app-container">
      {!session ? <Auth /> : <Home user={session.user} />}
    </div>
  );
}