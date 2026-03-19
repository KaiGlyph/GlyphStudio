// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/header';
import Footer from './components/layout/footer';

// Páginas generales
import Home     from './pages/home';
import NotFound from './pages/NotFound';

// Programación — vistas de sección
import Programacion2025 from './pages/programacion/programacion2025';
import CodigoSection    from './pages/programacion/codigoSection';
import LeaderSection    from './pages/programacion/leaderSection';

// Programación — Código: lenguajes
import PythonPage      from './pages/programacion/codigo/PythonPage';
import JavaScriptPage  from './pages/programacion/codigo/JavaScriptPage';
import TypeScriptPage  from './pages/programacion/codigo/TypeScriptPage';
import ReactPage       from './pages/programacion/codigo/ReactPage';

// Ladder — activas
import LadderLogicPage from './pages/programacion/ladder/LadderLogicPage';
import TiaPortalPage   from './pages/programacion/ladder/TiaPortalPage';

// Ladder — próximamente (descomenta al crear cada archivo)
// import PlcsPage        from './pages/programacion/ladder/PlcsPage';

import './styles/global.css';

// Placeholder temporal para páginas aún no creadas
function Proximamente() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 140px)',
      gap: '1rem',
      color: 'var(--text-secondary)',
      fontFamily: 'Orbitron, monospace',
    }}>
      <span style={{ fontSize: '3rem' }}>🚧</span>
      <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem' }}>Próximamente</h2>
      <p style={{ fontSize: '1rem', opacity: 0.7 }}>Este módulo está en construcción.</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
        <Header />

        <main style={{ flex: 1 }}>
          <Routes>

            {/* ── Ruta principal ───────────────────────── */}
            <Route path="/" element={<Home />} />

            {/* ── Programación 2025 — vista general ───── */}
            <Route path="/programacion-2025" element={<Programacion2025 />} />

            {/* ── Secciones de programación ─────────────── */}
            <Route path="/programacion/codigo"  element={<CodigoSection />} />
            <Route path="/programacion/ladder"  element={<LeaderSection />} />

            {/* ── Lenguajes de código ─────────────────── */}
            <Route path="/programacion/codigo/python"      element={<PythonPage />} />
            <Route path="/programacion/codigo/javascript"  element={<JavaScriptPage />} />
            <Route path="/programacion/codigo/typescript"  element={<TypeScriptPage />} />
            <Route path="/programacion/codigo/react"       element={<ReactPage />} />

            {/* ── Tecnologías Ladder ──────────────────── */}
            <Route path="/programacion/ladder/ladder-logic" element={<LadderLogicPage />} />
            <Route path="/programacion/ladder/tia-portal"   element={<TiaPortalPage />} />
            <Route path="/programacion/ladder/plcs"         element={<Proximamente />} />

            {/* ── 404 — siempre al final ──────────────── */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}