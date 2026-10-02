import type { Priority, Task } from "@/types";

export function filterTasks(
  tasks: Task[],
  search: string,
  priority: Priority | 'all'): Task[]
{
  return tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()) &&
    (priority === 'all' || t.priority === priority)
  )
}