import { supabase } from "@/lib/supabase";
import type { Priority, Task } from "@/types";


export async function getTasks(projectId: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('project_id', projectId)
    .order('position', { ascending: true })
  
  if (error) throw error
  
  return data ?? []
}

export async function createTask(input: { title: string, description?: string, project_id: string;  priority?: Priority}): Promise<Task> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No hay session')
  
  const { data, error } = await supabase
    .from('tasks')
    .insert({
      title: input.title,
      description: input.description,
      project_id: input.project_id,
      priority: input.priority ?? 'medium',
      user_id: user.id
    })
  
  if (error) throw error
  if(!data) throw new Error('No se pudo crear la tarea')
  return data
}

export async function toggleTask(id: string, status: Task['status']): Promise<Task> {
  const next = status === 'done' ? 'todo' : 'done'
  const { data, error } = await supabase.from('tasks').update({ status: next }).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function deleteTask(id: string): Promise<void> {
  const { error } = await supabase.from('tasks').delete().eq('id', id)
  if(error) throw error
}

