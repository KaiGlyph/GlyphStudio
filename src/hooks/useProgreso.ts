// src/hooks/useProgreso.ts
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface Progreso {
  completados:   number[];
  moduloActivo:  number;
  porcentaje:    number;
}

interface UseProgresoReturn {
  progreso:          Progreso;
  cargando:          boolean;
  guardarProgreso:   (completados: number[], moduloActivo: number, total: number) => Promise<void>;
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useProgreso(cursoId: string, totalModulos: number): UseProgresoReturn {
  const { user } = useAuth();

  const [progreso, setProgreso] = useState<Progreso>({
    completados:  [],
    moduloActivo: 0,
    porcentaje:   0,
  });
  const [cargando, setCargando] = useState(true);

  // Cargar progreso al montar o cuando cambia el usuario/curso
  useEffect(() => {
    if (!user) {
      setCargando(false);
      return;
    }

    async function cargar() {
      setCargando(true);
      const { data, error } = await supabase
      .from('progreso_cursos')
      .select('*')
      .eq('user_id', user!.id)
      .eq('curso_id', cursoId)
      .single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 = no rows found, no es un error real
        console.error('Error cargando progreso:', error);
      }

      if (data) {
        setProgreso({
          completados:  data.completados  ?? [],
          moduloActivo: data.modulo_activo ?? 0,
          porcentaje:   data.porcentaje    ?? 0,
        });
      }

      setCargando(false);
    }

    cargar();
  }, [user, cursoId]);

  // Guardar progreso en Supabase (upsert: crea si no existe, actualiza si existe)
  const guardarProgreso = useCallback(async (
    completados:  number[],
    moduloActivo: number,
    total:        number,
  ) => {
    if (!user) return;

    const porcentaje = Math.round((completados.length / total) * 100);

    // Actualizar estado local inmediatamente (optimistic update)
    setProgreso({ completados, moduloActivo, porcentaje });

    const { error } = await supabase
      .from('progreso_cursos')
      .upsert(
        {
          user_id:       user.id,
          curso_id:      cursoId,
          completados,
          modulo_activo: moduloActivo,
          porcentaje,
          updated_at:    new Date().toISOString(),
        },
        { onConflict: 'user_id,curso_id' }
      );

    if (error) {
      console.error('Error guardando progreso:', error);
    }
  }, [user, cursoId]);

  return { progreso, cargando, guardarProgreso };
}