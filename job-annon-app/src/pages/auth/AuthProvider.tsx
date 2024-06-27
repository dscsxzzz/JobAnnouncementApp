import {
    PropsWithChildren,
    createContext,
    useContext,
    useState,
} from 'react'
import { User } from '../../types/types'

const AuthContext = createContext<User | null>(null)

type AuthProviderProps = PropsWithChildren & {
    isSignedIn?: boolean
}

export default function AuthProvider({
    children,
    isSignedIn,
}: AuthProviderProps) {
    const [user] = useState<User | null>(
        isSignedIn ? { role: "user" } : null
    )

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error('useAuth must be used within AuthProvider')
    }

    return context
}
