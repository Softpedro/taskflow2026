import { supabase } from '@/lib/supabase'
import type { Project } from '@/types'

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: true })
  
  if (error) throw error
  
  return data ?? []
}

export async function createProject(input: { name: string; description?: string; color?: string; }): Promise<Project> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No hay session')
  
  const { data, error } = await supabase
    .from('projects')
    .insert({
      name: input.name,
      description: input.description,
      color: input.color ?? '#6366f1',
      user_id: user.id
    })
  
  if (error) throw error
  if(!data) throw new Error('No se pudo crear el proyecto')
  return data
}


export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if(error) throw error
}