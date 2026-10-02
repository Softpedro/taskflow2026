import { createProject, deleteProject } from "@/services/projects";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateProject() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: { name: string; description?: string; color?: string}) => createProject({...input}),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] })
  })
}

export function useDeleteProject() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: () => qc.invalidateQueries({queryKey: ['tasks']})
  })
}