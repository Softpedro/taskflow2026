import type { ReactNode } from "react"
import type { Task } from "@/types"

// ─────────────────────────────────────────────────────────────
// RENDER PROPS / FUNCTION AS CHILDREN (Slide 5)
// TaskCounter tiene LÓGICA (calcular stats) pero NO decide cómo se ve.
// Es un "catering": prepara los datos y te los entrega a TU función,
// que decide el JSX. Misma lógica, infinitas presentaciones.
// ─────────────────────────────────────────────────────────────
interface TaskStats {
  total: number
  pending: number
  done: number
}

interface TaskCounterProps {
  tasks: Task[]
  // children NO es JSX: es una FUNCIÓN que recibe los stats y devuelve JSX.
  children: (stats: TaskStats) => ReactNode
}

export function TaskCounter({ tasks, children }: TaskCounterProps) {
  // Esta es la lógica que el componente aporta (su valor)
  const stats: TaskStats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status !== 'done').length,
    done: tasks.filter(t => t.status === 'done').length,
  }

  // No renderiza nada propio: llama a la función children con los datos.
  return <>{children(stats)}</>
}

// Uso (para clase) — la MISMA lógica, dos presentaciones distintas:
//   <TaskCounter tasks={tasks}>
//     {({ done, total }) => <p>{done} de {total} listas</p>}
//   </TaskCounter>
//
//   <TaskCounter tasks={tasks}>
//     {({ pending }) => <Badge>{pending} pendientes</Badge>}
//   </TaskCounter>
