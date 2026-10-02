import { useLocalStorage } from "@/hooks/useLocalStorage"
import type { Task } from "@/types"


export default function Stats() {

  const [tasks] = useLocalStorage<Task[]>('taskflow:tasks', [])

  const counts = {
    todo: tasks.filter(t => t.status === 'todo').length,
    in_progress: tasks.filter(t => t.status === 'in_progress').length,
    done: tasks.filter(t => t.status === 'done').length
  }


  return (
    <div className="mb-4 grid grid-cols-3 gap-2 text-center">
      <div className="rounded-lg border border-gray-200 p-2">
        <p className="text-xl font-bold">{counts.todo}</p>
        <p className="text-xs text-gray-500">Por hacer</p>
      </div>
      <div className="rounded-lg border border-gray-200 p-2">
        <p className="text-xl font-bold">{counts.in_progress}</p>
        <p className="text-xs text-gray-500">En proceso</p>
      </div>
      <div className="rounded-lg border border-gray-200 p-2">
        <p className="text-xl font-bold">{counts.done}</p>
        <p className="text-xs text-gray-500">Completadas</p>
      </div>
    </div>
  )
}