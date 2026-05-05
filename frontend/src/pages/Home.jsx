import React from 'react';
import { supabase } from '../supabaseClient';
import MapView from '../components/MapView';

export default function Home({ user }) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="home-layout">
      <header className="app-header">
        <h1>PH AI Tourism Advisor</h1>
        <div className="user-controls">
          <span>Welcome, {user.email}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <main>
        <MapView />
      </main>
    </div>
  );
}