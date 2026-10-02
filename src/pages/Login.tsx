import { supabase } from "@/lib/supabase"
import { loginSchema, type LoginFormData } from "@/schemas/authSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: 'test@taskflow.com', password: '12345678'}
  })
  
  async function onSubmit(data: LoginFormData) {
    const { error } = await supabase.auth.signInWithPassword(data)
    if (error) {
      console.log(error, 'error')
      setError('root', { message: 'Credenciales invalidas' })
      return
    }
    navigate('/')
  }

  return(
    <div className="mx-auto mt-20 max-w-sm rounded-lg border border-gray-200 p-6">
      <h1 className="mb-4 text-2xl font-bold">Iniciar sesion</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div>
          <input
            className="w-full rounded-md border border-gray-300  px-3 py-2"
            type="text"
            aria-invalid={!!errors.email}
            {...register('email')}
          />
          {errors.email && <p>email malo</p>}
        </div>
        <div>
          <input
            type="password"
            className="w-full rounded-md border border-gray-300  px-3 py-2"
            aria-invalid={!!errors.password}
            {...register('password')}
          />
          {errors.password && <p> password muy corto</p>}
        </div>
        {errors.root && <p>{ errors.root.message }</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-indigo-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {isSubmitting ? 'Ingresando ...' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}