import { createClient } from "@supabase/supabase-js"

const url = import.meta.env.VITE_SUPABASE_URL
const anonkey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !anonkey) {
  throw new Error('Falta las variables de entorno VITE_SUPABASE_URL - VITE_SUPABASE_ANON_KEY en el archivo .env')
}

export const supabase = createClient(url, anonkey)