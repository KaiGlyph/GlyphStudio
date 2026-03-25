// src/pages/Login.tsx
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import './Login.css';

type Modo = 'login' | 'registro';

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [modo,             setModo]            = useState<Modo>(
    searchParams.get('modo') === 'registro' ? 'registro' : 'login'
  );
  const [email,            setEmail]           = useState('');
  const [username,         setUsername]        = useState('');
  const [password,         setPassword]        = useState('');
  const [passwordConfirm,  setPasswordConfirm] = useState('');
  const [error,            setError]           = useState('');
  const [info,             setInfo]            = useState('');
  const [cargando,         setCargando]        = useState(false);

  function resetForm() {
    setEmail(''); setUsername(''); setPassword(''); setPasswordConfirm('');
    setError(''); setInfo('');
  }

  // Reacciona a cambios en la URL sin desmontar el componente
  useEffect(() => {
    const nuevoModo = searchParams.get('modo') === 'registro' ? 'registro' : 'login';
    setModo(nuevoModo);
    resetForm();
  }, [searchParams]);

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setInfo('');

    if (modo === 'registro') {
      if (username.trim().length < 3) {
        setError('El nombre de usuario debe tener al menos 3 caracteres.');
        return;
      }
      if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        setError('El nombre de usuario solo puede contener letras, números y guiones bajos.');
        return;
      }
      if (password !== passwordConfirm) {
        setError('Las contraseñas no coinciden.');
        return;
      }
      if (password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres.');
        return;
      }
    }

    setCargando(true);

    if (modo === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(traducirError(error.message));
      } else {
        navigate('/cursos');
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username: username.trim() },
        },
      });
      if (error) {
        setError(traducirError(error.message));
      } else {
        setInfo('¡Cuenta creada! Revisa tu email para confirmar el registro y luego inicia sesión.');
        setModo('login');
        setPassword(''); setPasswordConfirm('');
      }
    }

    setCargando(false);
  }

  async function handleGoogle() {
    setCargando(true);
    setError('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/cursos` },
    });
    if (error) setError(traducirError(error.message));
    setCargando(false);
  }

  async function handleGitHub() {
    setCargando(true);
    setError('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: `${window.location.origin}/cursos` },
    });
    if (error) setError(traducirError(error.message));
    setCargando(false);
  }

  function traducirError(msg: string): string {
    if (msg.includes('Invalid login credentials'))  return 'Email o contraseña incorrectos.';
    if (msg.includes('Email not confirmed'))         return 'Confirma tu email antes de iniciar sesión.';
    if (msg.includes('User already registered'))     return 'Ya existe una cuenta con ese email.';
    if (msg.includes('Password should be'))          return 'La contraseña debe tener al menos 6 caracteres.';
    if (msg.includes('Unable to validate'))          return 'Email no válido.';
    return 'Ha ocurrido un error. Inténtalo de nuevo.';
  }

  return (
    <main className="login-page">
      <div className="login-glow" />

      <div className="login-card">

        <div className="login-logo">
          <span className="login-logo-text">GLYPH STUDIO</span>
        </div>

        <h1 className="login-title">
          {modo === 'login' ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
        </h1>
        <p className="login-subtitle">
          {modo === 'login'
            ? 'Inicia sesión para ver tu progreso en los cursos.'
            : 'Regístrate gratis para guardar tu progreso.'}
        </p>

        {/* Botones OAuth */}
        <div className="login-oauth">
          <button className="btn-oauth btn-google" onClick={handleGoogle} disabled={cargando}>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuar con Google
          </button>

          <button className="btn-oauth btn-github" onClick={handleGitHub} disabled={cargando}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            Continuar con GitHub
          </button>
        </div>

        <div className="login-separator">
          <span /><p>o con email</p><span />
        </div>

        <form className="login-form" onSubmit={handleEmail}>

          {modo === 'registro' && (
            <div className="login-field">
              <label htmlFor="username">Nombre de usuario</label>
              <input
                id="username"
                type="text"
                placeholder="ej: kai_glyph"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                disabled={cargando}
                autoComplete="username"
                maxLength={30}
              />
              <span className="login-field-hint">Solo letras, números y guiones bajos. Mínimo 3 caracteres.</span>
            </div>
          )}

          <div className="login-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={cargando}
              autoComplete="email"
            />
          </div>

          <div className="login-field">
            <div className="login-field-header">
              <label htmlFor="password">Contraseña</label>
              {modo === 'login' && (
                <button
                  type="button"
                  className="btn-forgot"
                  onClick={async () => {
                    if (!email) { setError('Escribe tu email primero.'); return; }
                    await supabase.auth.resetPasswordForEmail(email, {
                      redirectTo: `${window.location.origin}/login`,
                    });
                    setInfo('Te hemos enviado un email para restablecer la contraseña.');
                  }}
                >
                  ¿Olvidaste la contraseña?
                </button>
              )}
            </div>
            <input
              id="password"
              type="password"
              placeholder={modo === 'login' ? '••••••••' : 'Mínimo 6 caracteres'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              disabled={cargando}
              autoComplete={modo === 'login' ? 'current-password' : 'new-password'}
              minLength={6}
            />
          </div>

          {modo === 'registro' && (
            <div className="login-field">
              <label htmlFor="passwordConfirm">Confirmar contraseña</label>
              <input
                id="passwordConfirm"
                type="password"
                placeholder="Repite la contraseña"
                value={passwordConfirm}
                onChange={e => setPasswordConfirm(e.target.value)}
                required
                disabled={cargando}
                autoComplete="new-password"
                minLength={6}
              />
              {passwordConfirm.length > 0 && (
                <span className={`login-field-match ${password === passwordConfirm ? 'ok' : 'no'}`}>
                  {password === passwordConfirm ? '✓ Las contraseñas coinciden' : '✗ No coinciden'}
                </span>
              )}
            </div>
          )}

          {error && <p className="login-error">{error}</p>}
          {info  && <p className="login-info">{info}</p>}

          <button type="submit" className="btn-login-submit" disabled={cargando}>
            {cargando ? (
              <><span className="login-spinner" />Cargando...</>
            ) : (
              modo === 'login' ? 'Iniciar sesión' : 'Crear cuenta'
            )}
          </button>
        </form>

        <p className="login-switch">
          {modo === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
          {' '}
          <button
            className="btn-switch-modo"
            onClick={() => { setModo(modo === 'login' ? 'registro' : 'login'); resetForm(); }}
          >
            {modo === 'login' ? 'Regístrate gratis' : 'Inicia sesión'}
          </button>
        </p>

        <p className="login-legal">
          Al continuar aceptas nuestros{' '}
          <Link to="/terminos">Términos de uso</Link> y{' '}
          <Link to="/privacidad">Política de privacidad</Link>.
        </p>

      </div>
    </main>
  );
}