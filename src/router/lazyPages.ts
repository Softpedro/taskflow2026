import { lazy } from 'react'

export const Dashboard = lazy(() => import("@/pages/Dashboard"))
export const Projects = lazy(() => import("@/pages/Projects"))
export const Kanban = lazy(() => import("@/pages/Kanban"))
export const Settings = lazy(() => import("@/pages/Settings"))