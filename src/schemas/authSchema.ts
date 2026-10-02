import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email('Email Invalido'),
  password: z.string().min(6, 'Minimo 6 digitos'),
})

export type LoginFormData = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  fullName: z.string().min(2, 'Ingresa tu nombre'),
  email: z.email('Email invalido'),
  password: z.string().min(6, 'Minimo 6 caracteres'),
})

export type registerSchema = z.infer<typeof registerSchema>