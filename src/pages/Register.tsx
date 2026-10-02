import { SubmitButton } from "@/components";
import { supabase } from "@/lib/supabase";
import { registerSchema } from "@/schemas/authSchema";
import { useActionState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

type State = { error?: string;  ok?:boolean} | null

async function registerAction(_prev: State, formData: FormData): Promise<State> {
  
  const values = {
    fullName: String(formData.get('fullName') ?? ''),
    email: String(formData.get('email') ?? ''),
    password: String(formData.get('password') ?? '')
  }

  const parsed = registerSchema.safeParse(values)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const { error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
    options: {
      data: {
        full_name: values.fullName
      }
    }
  })
  if (error) return { error: 'No se pude resgistrar' }
  
  return { ok: true }
  
}

export default function Register() {
  const navigate = useNavigate()
  const [state, formAction] = useActionState(registerAction, null)

  useEffect(() => {
    if(state?.ok) navigate('/login')
  }, [state, navigate])

  return (
    <div className="mx-auto mt-20 max-w-sm rounded-card border border-border bg-surface-raised p-6">
      <h1 className="mb-4 text-2xl font-bold text-text">Crear Cuenta</h1>

      <form action={formAction} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Nombre"
          name="fullName"
          className="rounded-md border border-boder bg-surface px-3 py-2 text-text" />
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="rounded-md border border-boder bg-surface px-3 py-2 text-text" />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="rounded-md border border-boder bg-surface px-3 py-2 text-text" />
        {state?.error && <p className="text-sm text-priority-urgent">{ state.error }</p>}
        <SubmitButton label="Crear cuenta" />
        
      </form>
    </div>
  )
}