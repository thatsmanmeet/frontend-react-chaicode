import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import HomeScreen from './screens/HomeScreen.tsx'
import LoginScreen from './screens/LoginScreen.tsx'
import SignupScreen from './screens/SignupScreen.tsx'
import { AuthProvider } from './AuthContext.tsx'
import ProtectedRoutes from './screens/ProtectedRoutes.tsx'
import Dashboard from './screens/Dashboard.tsx'
import { Toaster } from 'sonner'

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        index: true,
        element: <HomeScreen />
      },
      {
        path: "/login",
        element: <LoginScreen />
      },
      {
        path: "/signup",
        element: <SignupScreen />
      },
      {
        path: "",
        element: <ProtectedRoutes />,
        children: [
          {
            path: '/dashboard',
            element: <Dashboard />
          }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  </StrictMode>,
)
