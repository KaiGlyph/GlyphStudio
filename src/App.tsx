// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import Home from './pages/home';
import './styles/global.css';

export default function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', width: '100%' }}>
          <Header />
          <main style={{ flex: 1, padding: '2rem 0' }}>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}