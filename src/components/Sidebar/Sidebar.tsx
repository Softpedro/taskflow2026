import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }: { isActive: boolean }) => {
  return cn(
    "block rounde-md px-3 py-2 text-sm",
    isActive ? "bg-primary text-primary-foreground" : "text-text hover:bg-surface-raised"
  )
}


export function Sidebar() {
  return (
    <div>
      <h2></h2>
      <nav>
        <NavLink to="/" className={linkClass}>Dashboard</NavLink>
        <NavLink to="/projects" className={linkClass}>Proyectos</NavLink>
        <NavLink to="/settings" className={linkClass}>Settings</NavLink>
      </nav>
    </div>
  )
}