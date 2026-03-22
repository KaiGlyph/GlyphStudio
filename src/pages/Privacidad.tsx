// src/pages/Privacidad.tsx
import './Legal.css';

export default function Privacidad() {
  return (
    <main className="legal-page">
      <div className="legal-container">
        <div className="legal-hero">
          <span className="legal-badge">Legal</span>
          <h1 className="legal-title">Política de privacidad</h1>
          <p className="legal-meta">Última actualización: marzo de 2025</p>
        </div>

        <div className="legal-content">

          <section className="legal-section">
            <h2>1. Datos que recopilamos</h2>
            <p>Glyph Studio recopila únicamente los datos necesarios para el funcionamiento del servicio:</p>
            <ul>
              <li><strong>Datos de cuenta:</strong> nombre y dirección de email cuando te registras.</li>
              <li><strong>Datos de progreso:</strong> qué módulos has completado y en cuál te quedaste, para poder reanudar donde lo dejaste.</li>
              <li><strong>Datos de uso anónimos:</strong> páginas visitadas y tiempo aproximado en cada sección, sin identificación personal.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>2. Cómo usamos tus datos</h2>
            <p>Los datos que recopilamos se usan exclusivamente para:</p>
            <ul>
              <li>Gestionar tu cuenta y permitirte acceder al servicio.</li>
              <li>Guardar y mostrar tu progreso en los cursos.</li>
              <li>Mejorar el contenido y la experiencia de la plataforma.</li>
              <li>Responderte cuando nos contactas.</li>
            </ul>
            <p>No vendemos, alquilamos ni cedemos tus datos personales a terceros con fines comerciales.</p>
          </section>

          <section className="legal-section">
            <h2>3. Proveedores de servicio</h2>
            <p>Glyph Studio utiliza los siguientes servicios de terceros para su funcionamiento:</p>
            <ul>
              <li><strong>Supabase:</strong> base de datos y autenticación. Tus datos se almacenan en sus servidores bajo su política de privacidad.</li>
              <li><strong>Vercel:</strong> alojamiento web. Gestiona las solicitudes al servidor.</li>
            </ul>
            <p>Estos proveedores están sujetos a sus propias políticas de privacidad y cumplen con las normativas aplicables (GDPR en Europa).</p>
          </section>

          <section className="legal-section">
            <h2>4. Cookies</h2>
            <p>Glyph Studio usa cookies técnicas mínimas necesarias para el funcionamiento del servicio (sesión de usuario, preferencias de tema). No usamos cookies de seguimiento publicitario ni de terceros con fines de marketing.</p>
          </section>

          <section className="legal-section">
            <h2>5. Tus derechos</h2>
            <p>Tienes derecho a:</p>
            <ul>
              <li>Acceder a los datos que tenemos sobre ti.</li>
              <li>Solicitar la corrección de datos incorrectos.</li>
              <li>Solicitar la eliminación de tu cuenta y todos tus datos.</li>
              <li>Exportar tus datos en un formato legible.</li>
            </ul>
            <p>Para ejercer cualquiera de estos derechos, contacta con nosotros en <a href="mailto:jordigallardo0621@gmail.com">jordigallardo0621@gmail.com</a>.</p>
          </section>

          <section className="legal-section">
            <h2>6. Seguridad</h2>
            <p>Tomamos medidas razonables para proteger tus datos: comunicaciones cifradas mediante HTTPS, contraseñas almacenadas con hash seguro y acceso restringido a los datos de usuario mediante Row Level Security en la base de datos.</p>
          </section>

          <section className="legal-section">
            <h2>7. Cambios en esta política</h2>
            <p>Si realizamos cambios significativos en esta política de privacidad, lo notificaremos en esta página con la fecha de actualización. Te recomendamos revisarla periódicamente.</p>
          </section>

        </div>
      </div>
    </main>
  );
}