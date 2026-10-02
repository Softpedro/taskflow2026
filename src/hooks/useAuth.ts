import { createContext, useContext } from "react"
import type {Session} from '@supabase/supabase-js'


interface AuthCOntextType {
  session: Session | null
  loading: boolean
}


export const AuthContext = createContext<AuthCOntextType | null>(null)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAth debe usarse dentro de un provider AuthProvider')
  return ctx
}