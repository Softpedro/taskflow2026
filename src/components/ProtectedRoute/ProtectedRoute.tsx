import { Navigate, Outlet } from 'react-router-dom'


export function ProtectedRoute() {
  const isAuth = true;

  return  isAuth ? <Outlet /> : <Navigate to="login" />
}

