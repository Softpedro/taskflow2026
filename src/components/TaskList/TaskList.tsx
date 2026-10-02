import type { Task } from "@/types"
import { TaskForm, TaskCard } from "@/components"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { useCallback, useMemo, useState } from "react"
import { TaskCounter } from "../TaskCounter/TaskCounter"
// import { useState } from "react"

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'design wireframes',
    status: 'todo',
    priority: 'high',
    project_id: 'p1',
    user_id: 'u1',
    position: 0,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'config vite',
    status: 'in_progress',
    priority: 'urgent',
    project_id: 'p1',
    user_id: 'u1',
    position: 1,
    created_at: new Date().toISOString()
  }
]

export function TaskList() {
  // const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [tasks, setTasks] = useLocalStorage<Task[]>('taskflow:tasks', initialTasks)
  const [query, setQuery] = useState('')

  const filteredTasks = useMemo(
    () => {
      console.log('init memo')
      return tasks.filter(t => t.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
    },
    [tasks, query]
  )

  // const filteredTasks = tasks.filter(t => t.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()))

  const addTask = useCallback((title: string) => {
    console.log('init callback')
    setTasks(prev => [...prev, {
      id: crypto.randomUUID(),
      title,
      status: 'todo',
      priority: 'medium',
      project_id: 'p1',
      user_id: 'u1',
      position: prev.length,
      created_at: new Date().toISOString()
    }])
  }, [setTasks])

  const deleteTask = useCallback((id: string) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? {...t, status: t.status === 'done' ? 'todo': 'done'} : t
      )
    )
  }, [setTasks])

  // const pending = tasks.filter(t => t.status !== 'done').length
  
  return (
    <>
      <div className="mx-auto max-w-md p-4">
        <h1 className="mb-4 text-2xl font-bold">TaskFlow</h1>

        <TaskForm onAdd={addTask} isSubmitting={false} />

        <input
          className="mb-3 w-full rounded-md border border-gray-300 px-3 py-2"
          placeholder="buscar tarea"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        
        {
          tasks.length > 0 && (
            <TaskCounter tasks={tasks}>
              {
                ({ done, total, pending }) => (
                  <p className="mb-2 text-sm text-gray-600">
                    {done} de {total} completadas * {pending} pendientes
                  </p>
                )
              }
            </TaskCounter>
          )
        }

        {
          filteredTasks.length === 0 ? (
            <p>No hay tareas pendientes, crea la primera</p>
          ) : (
            <div className="flex flex-col gap-3">
              {
                filteredTasks.map(task =>  (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onDelete={deleteTask}
                  />
                  )
                )
              }
            </div>  
          )
        }
      </div>
    </>
  )
}