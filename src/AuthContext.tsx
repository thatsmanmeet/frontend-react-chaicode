import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type UserProps = {
    _id: string
    username: string
    email: string
    role: string
    loginType: string
    isEmailVerified: boolean
    createdAt: string
    updatedAt: string
    avatar: {
        url: string
        localPath: string
        _id: string
    }
}

type StoredAuthData = {
    user: UserProps
    accessToken: string
    refreshToken: string
}

type AuthContextType = {
    userInfo: StoredAuthData | null
    loginUser(data: StoredAuthData): { success: boolean }
    logoutUser(): { success: boolean }
}

const AuthContext = createContext<AuthContextType | null>(null)

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const stored = localStorage.getItem("userInfo")
    const [userInfo, setUserInfo] = useState<StoredAuthData | null>(stored ? JSON.parse(stored) : null)

    const loginUser = (data: StoredAuthData) => {
        localStorage.setItem("userInfo", JSON.stringify(data))
        setUserInfo(data)
        return { success: true }
    }

    const logoutUser = () => {
        localStorage.removeItem("userInfo")
        setUserInfo(null)
        return { success: true }
    }

    return (
        <AuthContext.Provider value={{ loginUser, logoutUser, userInfo }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("Cannot use context outside provider")
    }

    return context
}

export { AuthContext, AuthProvider }
export type { UserProps, StoredAuthData, AuthContextType }

