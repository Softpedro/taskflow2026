import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { projectSchema, type ProjectFormData } from "@/schemas/projectSchema"
import { Button } from "@/components/ui/button"

interface ProjectFormProps {
  onCreate: (data: ProjectFormData) => void
  isSubmitting?: boolean
}

export function ProjectForm({ onCreate, isSubmitting }: ProjectFormProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    mode: 'onBlur',
    defaultValues: { name: '', description: '' },
  })
  function onSubmit(data: ProjectFormData) { onCreate(data); reset() }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-6 flex flex-col gap-2 rounded-card border border-border bg-surface-raised p-4">
      <h2 className="font-semibold text-text">Nuevo proyecto</h2>
      <div>
        <input className="w-full rounded-md border border-border bg-surface px-3 py-2 text-text"
          placeholder="Nombre" aria-invalid={!!errors.name} {...register('name')} />
        {errors.name && <p className="text-sm text-priority-urgent">{errors.name.message}</p>}
      </div>
      <input className="w-full rounded-md border border-border bg-surface px-3 py-2 text-text"
        placeholder="Descripción (opcional)" {...register('description')} />
      <Button type="submit" size="sm" disabled={isSubmitting}>{isSubmitting ? 'Creando...' : 'Crear proyecto'}</Button>
    </form>
  )
}
