import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link, Navigate, useNavigate } from "react-router"
import { Lock } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { useAuthContext } from "@/AuthContext"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { loginUser, userInfo } = useAuthContext()
  const navigate = useNavigate()

  if (userInfo) {
    return <Navigate to="/dashboard" replace />
  }

  const handleLogin = async () => {
    if (!username || !password) {
      return;
    }
    try {
      setLoading(true)

      const res = await fetch('https://api.freeapi.app/api/v1/users/login', {
        method: "POST",
        headers: { accept: 'application/json', 'content-type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.message ?? "Something went wrong during login")
        return
      }

      loginUser(data.data)
      toast.success("Login Successful")
      navigate("/dashboard")

    } catch (error: any) {
      toast.error(error.message)
      setUsername("")
      setPassword("")
    } finally {
      setLoading(false)
    }

  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="items-center ">
          <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-center mb-2">
            <Lock className="size-7 text-primary" />
          </div>
          <CardTitle>Login to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="johndoe"
                  required
                />
              </Field>
              <Field>

                <Input id="password" type="password" value={password}
                  onChange={(e) => setPassword(e.target.value)} required />
              </Field>
              <Field>
                <Button type="button" disabled={loading} onClick={handleLogin}>Login</Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link to="/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
