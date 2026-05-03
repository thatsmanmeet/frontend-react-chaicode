import { useAuthContext } from "@/AuthContext"
import { Navigate, Outlet } from "react-router"


function ProtectedRoutes() {
    const { userInfo } = useAuthContext()

    if (!userInfo) {
        return <Navigate to={'/login'} />
    }
    return (
        <Outlet />
    )
}

export default ProtectedRoutes