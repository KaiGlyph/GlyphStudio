// src/components/ui/Card.tsx
import React from 'react';

export interface CardProps {
  title?: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function Card({
  title,
  children,
  onClick,
  className = '',
}: CardProps) {
  return (
    <article
      onClick={onClick}
      style={{
        backgroundColor: 'var(--bg-darker)',
        borderRadius: 'var(--border-radius)',
        padding: '1.5rem',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        transition: 'var(--transition)',
        cursor: onClick ? 'pointer' : 'default',
        ...(!onClick && { pointerEvents: 'none' } as React.CSSProperties),
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 20px rgba(96, 165, 250, 0.2)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        }
      }}
      className={className}
    >
      {title && (
        <h3
          style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            color: 'var(--accent-blue)',
            marginBottom: '1rem',
            fontFamily: '"Orbitron", monospace',
          }}
        >
          {title}
        </h3>
      )}
      <div style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
        {children}
      </div>
    </article>
  );
}