import { ProjectForm } from "@/components"
import { Button } from "@/components/ui/button"
import { useCreateProject, useDeleteProject } from "@/hooks/useProjectMutation"
import { useProjects } from "@/hooks/useProjects"
import { Link } from "react-router-dom"


export default function Projects() {
  const { data: projects, isPending, isError, refetch } = useProjects()
  const createProject = useCreateProject()
  const deleteProject = useDeleteProject()
  
  return(
    <div className="mx-auto max-w-lg p-4">
      <h1>Proyectos</h1>
      {/* #TODO: falta crear formulario de agregar */}
      <ProjectForm isSubmitting={createProject.isPending} onCreate={(data) => createProject.mutate(data)} />
      {isPending ? (
        <div>cargando ...</div>
      ) : isError ? (
          <>
            <div>No pudimos cargar tus proyectos</div>
            <Button onClick={() => refetch() } >Reintentar</Button>
          </>
        ) : (
        <div className="flex flex-col gap-2">
          {
            projects.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-card border border-border p-3">
                <Link to={`/projects/${p.id}`} className="flex items-center gap-2">
                  <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor:  p.color}} />
                  {p.name}
                </Link>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteProject.mutate(p.id)}
                >
                  Eliminar
                </Button>
              </div>
            ))
          }
        </div>    
      )}
    </div>
  )
}