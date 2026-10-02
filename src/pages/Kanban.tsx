import { useMemo, useOptimistic, useTransition } from "react"
import { useParams } from "react-router-dom"
import { useTasks } from "@/hooks/useTasks"
import { useCreateTask, useToggleTask, useDeleteTask } from "@/hooks/useTaskMutations"
import { TaskForm } from "@/components/TaskForm/TaskForm"
import { Button } from "@/components/ui/button"
import { useFilters } from "@/stores/filtersStore"
import { useAppSelector, useAppDispatch } from "@/store/hooks" // REDUX
import { toggleViewMode } from "@/store/uiSlice"
import type { Task } from "@/types"

function TasksSkeleton() {
  return <div className="flex flex-col gap-2">{Array.from({ length: 4 }).map((_, i) => (
    <div key={i} className="h-14 animate-pulse rounded-card bg-surface-raised" />))}</div>
}

export default function Kanban() {
  const { id } = useParams()
  const { data: tasks, isPending, isError, refetch } = useTasks(id!)
  const createTask = useCreateTask(id!)
  const toggleTask = useToggleTask(id!)
  const deleteTask = useDeleteTask(id!)

  //useOptimistic() REACT 19
  const [optimisticTasks, applyOptimisticToggle] = useOptimistic(
    tasks ?? [],
    (state: Task[], toggledId: string) =>
      state.map((t) => t.id === toggledId ? { ...t, status: t.status === 'done' ? 'todo' : 'done' } : t)
  )
  const [, startTransition] = useTransition()

  function handleToggle(task: Task) {
    startTransition(async () => {
      applyOptimisticToggle(task.id)

      try {
        await toggleTask.mutateAsync(task)
      } catch {
        // error
      }
    })
  }

  // ZUSTAND con SELECTORES quirúrgicos: cada uno se suscribe solo a su parte
  const search = useFilters((s) => s.search)
  const priority = useFilters((s) => s.priority)
  const setSearch = useFilters((s) => s.setSearch)
  const setPriority = useFilters((s) => s.setPriority)

  // REDUX: densidad de la lista (la herramienta "heredada")
  const viewMode = useAppSelector((s) => s.ui.viewMode)
  const dispatch = useAppDispatch()

  const filtered = useMemo(() => optimisticTasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()) &&
    (priority === 'all' || t.priority === priority)
  ), [optimisticTasks, search, priority])

  if (isPending) return <div className="p-4"><TasksSkeleton /></div>
  if (isError) return (
    <div className="p-4 text-center">
      <p className="mb-3 text-text-muted">No pudimos cargar tus tareas.</p>
      <Button onClick={() => refetch()}>Reintentar</Button>
    </div>
  )
  console.log('init')
  return (
    <div className="mx-auto max-w-md p-4">
      <h1 className="mb-4 text-2xl font-bold text-text">Tareas</h1>

      <TaskForm isSubmitting={createTask.isPending} onAdd={(data) => {console.log(data)}} />

      {/* Filtros (Zustand). El buscador escribe en el store; la lista lee. */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <input className="flex-1 rounded-md border border-border bg-surface px-3 py-2 text-text"
          placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="rounded-md border border-border bg-surface px-2 py-2 text-text"
          value={priority} onChange={(e) => setPriority(e.target.value as typeof priority)}>
          <option value="all">Todas</option>
          <option value="urgent">Urgente</option>
          <option value="high">Alta</option>
          <option value="medium">Media</option>
          <option value="low">Baja</option>
        </select>
        <Button size="sm" variant="ghost" onClick={() => dispatch(toggleViewMode())}>
          {viewMode === 'comfortable' ? 'Compacto' : 'Cómodo'}
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {filtered.map((task) => (
          <div key={task.id} className={`flex items-center justify-between rounded-card border border-border bg-surface-raised ${viewMode === 'compact' ? 'p-1.5' : 'p-3'}`}>
            <span className={task.status === 'done' ? 'text-text-muted line-through' : 'text-text'}>{task.title}</span>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={() => handleToggle(task)}>
                {task.status === 'done' ? 'Reabrir' : 'Completar'}
              </Button>
              <Button size="sm" variant="destructive" onClick={() => deleteTask.mutate(task.id)}>Eliminar</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
