// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface AuthContextType {
  user:            User | null;
  session:         Session | null;
  cargando:        boolean;
  cerrarSesion:    () => Promise<void>;
  loginConGoogle:  () => Promise<void>;   // ← nuevo
  loginConGitHub:  () => Promise<void>;   // ← nuevo
}

// ─── Contexto (valores por defecto) ──────────────────────────────────────────

const AuthContext = createContext<AuthContextType>({
  user:            null,
  session:         null,
  cargando:        true,
  cerrarSesion:    async () => {},
  loginConGoogle:  async () => {},        // ← nuevo
  loginConGitHub:  async () => {},        // ← nuevo
});

// ─── Provider ────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,     setUser]     = useState<User | null>(null);
  const [session,  setSession]  = useState<Session | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Obtener sesión inicial
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setCargando(false);
    });

    // Escuchar cambios de sesión (login, logout, refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setCargando(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function cerrarSesion() {
    await supabase.auth.signOut();
  }

  async function loginConGoogle() {
  await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,   // vuelve a la raíz tras login
      },
    });
  }

  async function loginConGitHub() {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: window.location.origin,
      },
    });
  }

  return (
    <AuthContext.Provider value={{ user, session, cargando, cerrarSesion, loginConGoogle, loginConGitHub }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useAuth() {
  return useContext(AuthContext);
}