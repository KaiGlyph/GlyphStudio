// src/pages/Terminos.tsx
import './Legal.css';

export default function Terminos() {
  return (
    <main className="legal-page">
      <div className="legal-container">
        <div className="legal-hero">
          <span className="legal-badge">Legal</span>
          <h1 className="legal-title">Términos de uso</h1>
          <p className="legal-meta">Última actualización: marzo de 2025</p>
        </div>

        <div className="legal-content">

          <section className="legal-section">
            <h2>1. Aceptación de los términos</h2>
            <p>Al acceder y utilizar Glyph Studio, aceptas estos términos de uso en su totalidad. Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar el servicio.</p>
          </section>

          <section className="legal-section">
            <h2>2. Descripción del servicio</h2>
            <p>Glyph Studio es una plataforma educativa que ofrece contenido formativo sobre programación y automatización industrial. El contenido está diseñado con fines educativos y puede utilizarse libremente para aprendizaje personal.</p>
          </section>

          <section className="legal-section">
            <h2>3. Uso del contenido</h2>
            <p>Todo el contenido de Glyph Studio (textos, ejemplos de código, ejercicios y soluciones) puede usarse para aprendizaje personal y proyectos propios. No está permitido:</p>
            <ul>
              <li>Reproducir o redistribuir el contenido con fines comerciales sin autorización expresa.</li>
              <li>Presentar el contenido de Glyph Studio como propio en otras plataformas educativas.</li>
              <li>Utilizar el contenido para entrenar modelos de inteligencia artificial sin autorización.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>4. Cuenta de usuario</h2>
            <p>Si creas una cuenta en Glyph Studio, eres responsable de mantener la confidencialidad de tus credenciales y de todas las actividades que ocurran bajo tu cuenta. Notifícanos inmediatamente si detectas un uso no autorizado.</p>
          </section>

          <section className="legal-section">
            <h2>5. Limitación de responsabilidad</h2>
            <p>El contenido de Glyph Studio se proporciona "tal cual", sin garantías de ningún tipo. Aunque nos esforzamos en mantener el contenido actualizado y correcto, no garantizamos que esté libre de errores. El uso del contenido en entornos de producción es responsabilidad del usuario.</p>
          </section>

          <section className="legal-section">
            <h2>6. Modificaciones</h2>
            <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor cuando se publiquen en esta página. El uso continuado del servicio después de los cambios implica la aceptación de los nuevos términos.</p>
          </section>

          <section className="legal-section">
            <h2>7. Contacto</h2>
            <p>Si tienes preguntas sobre estos términos, puedes contactarnos en <a href="mailto:jordigallardo0621@gmail.com">jordigallardo0621@gmail.com</a>.</p>
          </section>

        </div>
      </div>
    </main>
  );
}