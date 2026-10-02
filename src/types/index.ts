export type Priority = 'urgent' | 'high' | 'medium' | 'low'


export type Status = 'todo' | 'in_progress' | 'in_review' | 'done'


export interface Task {
  id: string;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  project_id: string;
  user_id: string;
  due_date?: string;
  position: number;
  created_at: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  color: string;
  user_id: string;
  created_at: string;
}


export interface Profile {
  id: string;
  full_name: string;
  avatar_url?: string;
  created_at: string;
}