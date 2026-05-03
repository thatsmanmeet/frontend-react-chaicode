import { useAuthContext } from "@/AuthContext"
import type { UserProps } from "@/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router"
import { toast } from "sonner"


function Dashboard() {
    const { logoutUser, userInfo } = useAuthContext()
    const navigate = useNavigate()
    const [user, setUser] = useState<UserProps | null>(userInfo?.user ?? null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("https://api.freeapi.app/api/v1/users/current-user", {
                    headers: { Authorization: `Bearer ${userInfo?.accessToken}` },
                })
                const data = await res.json()
                if (res.ok) setUser(data.data)
            } catch {
                // fall back to cached userInfo
                toast.error("Unable to fetch the user details!")
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [userInfo?.accessToken])

    const handleLogout = async () => {
        try {
            await fetch("https://api.freeapi.app/api/v1/users/logout", {
                method: "POST",
                headers: { Authorization: `Bearer ${userInfo?.accessToken}` },
            })
        } catch {
            // logout locally regardless
        }
        logoutUser()
        navigate("/")
    }

    if (!userInfo) return <Navigate to="/login" replace />

    const initials = user?.username?.slice(0, 2).toUpperCase() ?? "??"

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-sm">
                <CardHeader className="items-center gap-3 pb-2">
                    <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-xl font-semibold text-primary">
                        {loading ? "..." : initials}
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-semibold">{user?.username ?? "—"}</p>
                        <p className="text-sm text-muted-foreground">{user?.email ?? "—"}</p>
                    </div>
                </CardHeader>

                <Separator />

                <CardContent className="pt-4 space-y-3">
                    <Row label="Role" value={user?.role ?? "—"} />
                    <Row label="Login type" value={user?.loginType ?? "—"} />
                    <Row
                        label="Email verified"
                        value={user?.isEmailVerified ? "Yes" : "No"}
                        valueClass={user?.isEmailVerified ? "text-green-600" : "text-amber-500"}
                    />
                    <Row
                        label="Member since"
                        value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
                    />

                    <Separator />

                    <Button variant="destructive" className="w-full" onClick={handleLogout}>
                        Logout
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

function Row({ label, value, valueClass = "" }: { label: string; value: string; valueClass?: string }) {
    return (
        <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{label}</span>
            <span className={`font-medium ${valueClass}`}>{value}</span>
        </div>
    )
}

export default Dashboard
