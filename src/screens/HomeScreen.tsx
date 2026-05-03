import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/AuthContext";

function HomeScreen() {
    const { userInfo } = useAuthContext()
    const navigate = useNavigate()

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center space-y-6">
                <h1 className="text-5xl font-bold tracking-tight">React Auth</h1>
                <p className="text-muted-foreground text-lg">A simple authentication starter</p>
                <Button size="lg" onClick={() => navigate(userInfo ? "/dashboard" : "/login")}>
                    {userInfo ? "Go to Dashboard" : "Login"}
                </Button>
            </div>
        </div>
    )
}

export default HomeScreen
