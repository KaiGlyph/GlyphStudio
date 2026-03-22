// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnon) {
  throw new Error('Faltan las variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseAnon);

// ─── Tipos ───────────────────────────────────────────────────────────────────

export interface ProgresoRow {
  id:            string;
  user_id:       string;
  curso_id:      string;
  completados:   number[];
  modulo_activo: number;
  porcentaje:    number;
  updated_at:    string;
}