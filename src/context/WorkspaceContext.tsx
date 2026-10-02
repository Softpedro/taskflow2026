import { WorkspaceContext, type ActiveProjects } from "@/hooks/useWorkspace";
import { useState } from "react";

const projects: ActiveProjects[]  = [
  {
    id: 'P1',
    name: 'Sitio web',
    color: '#3B82F6'
  },
  {
    id: 'P2',
    name: 'App Mobile',
    color: '#10B981'
  }
]


export function WorkspaceProvider({children}: {children: React.ReactNode}) {
  const [activeProject, setActiveProject] = useState<ActiveProjects>(projects[0])

  return (
    <WorkspaceContext.Provider value={{ activeProject, projects, setActiveProject }}>
      {children}
    </WorkspaceContext.Provider>
  )
}