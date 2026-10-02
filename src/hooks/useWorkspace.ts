import { createContext, useContext } from "react";

export interface ActiveProjects {
  id: string
  name: string
  color: string
}

interface WorkspaceContextType {
  activeProject: ActiveProjects
  projects: ActiveProjects[]
  setActiveProject: (project: ActiveProjects) => void
}

export const WorkspaceContext = createContext<WorkspaceContextType | null>(null)

export function useWorkspace() {
  const context = useContext(WorkspaceContext)

  if (!context) throw new Error('no estas dentro del context de WorkspaceProvider')
  
  return context
}