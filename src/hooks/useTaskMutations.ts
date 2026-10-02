import { createTask, deleteTask, toggleTask } from "@/services/tasks";
import type { Priority, Task } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTask(projectId: string) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (input: { title: string; description?: string; priority?: Priority}) => createTask({...input, project_id: projectId}),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tasks', projectId] })
  })
}

export function useToggleTask(projectId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (task: Task) => toggleTask(task.id, task.status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tasks', projectId] }),
  })
}

export function useDeleteTask(ProjectId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => qc.invalidateQueries({queryKey: ['tasks', ProjectId]})
  })
}

