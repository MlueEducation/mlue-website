'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const AuthContext = createContext({ user: null, loading: true });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Supabase puts the session token in the URL right after an
    // email-confirm redirect. Strip it immediately so a copied/shared
    // link never carries someone else's login with it.
    if (window.location.hash && window.location.hash.includes('access_token')) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session ? data.session.user : null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session ? session.user : null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
