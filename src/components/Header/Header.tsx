import { useWorkspace } from "@/hooks/useWorkspace"
import { ThemeToggle } from "../ThemeToggle"

export function Header() {

  const { activeProject,projects, setActiveProject } = useWorkspace()

  return (
    <header className="mb-4 flex items-center justify-between border-b border-gray-200 pb-3">
      <div className="flex items-center gap-2">
        <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: activeProject.color }} />
        <span className="">{ activeProject.name }</span>
      </div>

      <div className="flex gap-1">

        <ThemeToggle />
        {
          projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveProject(p)}
              className={p.id === activeProject.id
                ? 'rounded bg-gray-900 px-2 py-1 text-xs text-white'
                : 'rounded bg-gray-100 px-2 py-1 text-xs'
              }
            >{p.name}</button>
          ))
        }
      </div>
    </header>
  )
}