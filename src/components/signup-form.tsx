import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
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

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { userInfo } = useAuthContext()

  if (userInfo) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSignup = async () => {
    if (!username || !email || !password) return

    try {
      setLoading(true)

      const res = await fetch("https://api.freeapi.app/api/v1/users/register", {
        method: "POST",
        headers: { accept: "application/json", "content-type": "application/json" },
        body: JSON.stringify({ username, email, password, role: "USER" }),
      })
      const data = await res.json()

      if (!res.ok) {
        toast.error(data.message ?? "Something went wrong during signup")
        return
      }

      toast.success("Account created! Please log in.")
      navigate("/login")
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card {...props}>
      <CardHeader className="items-center ">
        <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-center mb-2">
          <Lock className="size-7 text-primary" />
        </div>
        <CardTitle>Create new account</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                id="username"
                type="text"
                placeholder="johndoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Field>
            <Field>
              <Button type="button" disabled={loading} onClick={handleSignup}>
                Create Account
              </Button>
              <FieldDescription className="text-center">
                Already have an account? <Link to="/login">Sign in</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
