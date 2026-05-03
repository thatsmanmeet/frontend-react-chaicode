import { SignupForm } from "@/components/signup-form"


function SignupScreen() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-2xl">
                <SignupForm />
            </div>
        </div>
    )
}

export default SignupScreen