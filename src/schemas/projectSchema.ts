import { z } from "zod"
export const projectSchema = z.object({
  name: z.string().min(2, 'Mínimo 2 caracteres'),
  description: z.string().max(200, 'Máximo 200').optional(),
})
export type ProjectFormData = z.infer<typeof projectSchema>
