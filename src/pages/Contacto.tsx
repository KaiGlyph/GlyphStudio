// src/pages/Contacto.tsx
import { useState } from 'react';
import './Contacto.css';

type Estado = 'idle' | 'enviando' | 'enviado' | 'error';

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', email: '', asunto: '', mensaje: '' });
  const [estado, setEstado] = useState<Estado>('idle');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEstado('enviando');
    // Simulación — cuando tengas backend/Supabase, reemplaza esto
    await new Promise(r => setTimeout(r, 1500));
    setEstado('enviado');
  }

  const contactInfo = [
    {
      icono: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
      label: 'Email',
      valor: 'jordigallardo0621@gmail.com',
      href: 'mailto:jordigallardo0621@gmail.com',
    },
    {
      icono: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.22c-3.338.724-4.033-1.415-4.033-1.415-.546-1.39-1.333-1.76-1.333-1.76-1.09-.745.084-.73.084-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.776.418-1.304.76-1.604-2.665-.304-5.466-1.33-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 013.003-.404c1.018.005 2.045.138 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.655 1.653.243 2.873.12 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.804 5.625-5.475 5.922.43.37.823 1.103.823 2.222v3.293c0 .32.216.694.825.576C20.565 21.796 24 17.296 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      ),
      label: 'GitHub',
      valor: 'KaiGlyph',
      href: 'https://github.com/KaiGlyph',
    },
    {
      icono: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452H16.9v-5.569c0-1.328-.027-3.038-1.852-3.038-1.853 0-2.136 1.447-2.136 2.941v5.666H9.325V9h3.397v1.561h.047c.473-.9 1.633-1.852 3.363-1.852 3.594 0 4.256 2.366 4.256 5.444v6.299zM5.337 7.433c-1.09 0-1.973-.882-1.973-1.973 0-1.09.883-1.973 1.973-1.973 1.09 0 1.973.883 1.973 1.973 0 1.09-.883 1.973-1.973 1.973zM6.813 20.452H3.861V9h2.952v11.452zM22.225 0H1.771C.792 0 0 .77 0 1.722v20.555C0 23.23.792 24 1.771 24h20.451c.98 0 1.778-.77 1.778-1.722V1.722C24 .77 23.204 0 22.225 0z"/>
        </svg>
      ),
      label: 'LinkedIn',
      valor: 'jordi-gallardo-sanchez',
      href: 'https://linkedin.com/in/jordi-gallardo-sanchez',
    },
  ];

  return (
    <main className="contacto-page">
      <div className="contacto-container">

        {/* Hero */}
        <section className="contacto-hero">
          <div className="contacto-glow" />
          <h1 className="contacto-title">¿Tienes alguna pregunta?</h1>
          <p className="contacto-subtitle">
            Si tienes dudas sobre los cursos, sugerencias de contenido o simplemente
            quieres decir hola, escríbenos. Respondemos a todos los mensajes.
          </p>
        </section>

        {/* Grid: form + info */}
        <div className="contacto-grid">

          {/* Formulario */}
          <div className="contacto-form-wrapper">
            {estado === 'enviado' ? (
              <div className="contacto-success">
                <span className="success-icon">✓</span>
                <h3>Mensaje enviado</h3>
                <p>Gracias por escribirnos. Te responderemos lo antes posible.</p>
                <button
                  className="btn-contacto-primary"
                  onClick={() => { setEstado('idle'); setForm({ nombre: '', email: '', asunto: '', mensaje: '' }); }}
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form className="contacto-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      placeholder="Tu nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      required
                      disabled={estado === 'enviando'}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                      disabled={estado === 'enviando'}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="asunto">Asunto</label>
                  <select
                    id="asunto"
                    name="asunto"
                    value={form.asunto}
                    onChange={handleChange}
                    required
                    disabled={estado === 'enviando'}
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="duda-curso">Duda sobre un curso</option>
                    <option value="sugerencia">Sugerencia de contenido</option>
                    <option value="error">Reportar un error</option>
                    <option value="colaboracion">Colaboración</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="mensaje">Mensaje</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    placeholder="Escribe tu mensaje aquí..."
                    rows={6}
                    value={form.mensaje}
                    onChange={handleChange}
                    required
                    disabled={estado === 'enviando'}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-contacto-primary"
                  disabled={estado === 'enviando'}
                >
                  {estado === 'enviando' ? (
                    <>
                      <span className="spinner" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar mensaje
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Info de contacto */}
          <div className="contacto-info">
            <h2 className="contacto-info-title">Otras formas de contactar</h2>
            <p className="contacto-info-desc">
              También puedes encontrarnos directamente en estas plataformas.
            </p>
            <div className="contacto-links">
              {contactInfo.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contacto-link-item"
                >
                  <span className="contacto-link-icon">{item.icono}</span>
                  <div>
                    <p className="contacto-link-label">{item.label}</p>
                    <p className="contacto-link-valor">{item.valor}</p>
                  </div>
                  <svg className="contacto-link-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              ))}
            </div>

            <div className="contacto-tiempo">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              <span>Tiempo de respuesta habitual: menos de 48 horas</span>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}