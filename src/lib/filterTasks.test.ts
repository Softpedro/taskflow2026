import { describe, it, expect } from 'vitest'
import { filterTasks } from './filterTasks'
import type { Task } from '@/types'


const makeTask = (over: Partial<Task>): Task => ({
  id: '1',
  title: 'Test Task',
  description: 'Test Description',
  status: 'todo',
  priority: 'low',
  project_id: '1',
  user_id: '1',
  due_date: '2026-01-01',
  position: 1,
  created_at: '2026-01-01',
  ...over,
})

describe('filterTasks', () => {
  const tasks = [
      makeTask({ title: 'Design home', priority: 'high' }),
      makeTask({ title: 'configurar vite', priority: 'urgent' }),
      makeTask({ title: 'Diseñar footer', priority: 'low' }),
    ]
  it('sin filtros devuelve todas las tareas', () => {
    expect(filterTasks(tasks, '', 'all')).toHaveLength(3)
  })

  it('filtrar por prioridad', () => {
    const r = filterTasks(tasks, '', 'urgent')
    expect(r).toHaveLength(1)
    expect(r[0].title).toBe('configurar vite')
  })


})
