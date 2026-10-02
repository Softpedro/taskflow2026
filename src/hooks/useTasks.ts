import { getTasks } from "@/services/tasks";
import { useQuery } from "@tanstack/react-query";

export function useTasks(projectId: string) {
  return useQuery({
    queryKey: ['tasks', projectId],
    queryFn: () => getTasks(projectId),
    enabled: !!projectId
  })
}