// src/database/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

// Detectar si estamos en modo demo (misma lógica que en teamsService)
const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true'

// Si estamos en demo, no creamos el cliente. Lanzamos un error controlado o devolvemos null.
// Para que el resto de la app no falle, devolvemos un objeto "falso" o simplemente no creamos el cliente.
export const supabase = DEMO_MODE 
  ? (null as any) // ⚠️ Esto evita que el código intente conectarse
  : createClient(
      import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co',
      import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder_key'
    )