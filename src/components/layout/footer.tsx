// src/components/layout/Footer.tsx
export default function Footer() {
  return (
    <footer
      style={{
        marginTop: 'auto',
        paddingTop: '2rem',
        paddingBottom: '2rem',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        fontSize: '0.875rem',
        color: 'var(--text-secondary)',
        textAlign: 'center',
      }}
    >
      © {new Date().getFullYear()} Studio Glyph — Programación 2025 → Música 2026
    </footer>
  );
}