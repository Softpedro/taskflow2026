import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { Suspense } from 'react'
import { Sidebar } from "../Sidebar/Sidebar";


export function Layout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main>
          <Suspense fallback={<p>...Cargando seccion</p>}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  )
}