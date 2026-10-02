import type { Task } from "@/types"

interface TaskCardProps {
  task: Task
  onDelete: (id: string) => void
}
const priorityStyles: Record<Task['priority'], string> = {
  urgent: 'bg-rose-500/20',
  high: 'bg-orange-600/20',
  medium: 'bg-blue-600/20',
  low: 'bg-scale-500/20'
}

const statusLabels: Record<Task['status'], string> = {
  todo: 'por hacer',
  in_progress: 'En proceso...',
  in_review: 'En revision',
  done: 'Completada'
}

export function TaskCard({ task, onDelete }: TaskCardProps) { 
  
  
  const isDone = task.status === 'done'

  return (
    <div className={`rounded-lg border border-gray-200 p-3 ${priorityStyles[task.priority]}`}>
      <div className={isDone ? 'font-medium line-through text-gray-400' : "font-medium"}>
        <h3>{task.title}</h3>
        <span className="text-xs text-gray-600">
          {statusLabels[task.status]}
        </span>
        <div>
          {/* <button></button> */}
          <button onClick={() => onDelete(task.id)} className="test-sm text-rose-600">Eliminar</button>
        </div>
      </div>
    </div>
  )
}