import { PropsWithChildren, useEffect } from 'react'
import { useAuth } from '../AuthProvider'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../../state/store'
import { useSelector } from 'react-redux'

type ProtectedRouteProps = PropsWithChildren

export default function ProtectedRouteCan({ children }: ProtectedRouteProps) {
    const user = useAuth()
    const navigate = useNavigate()
    const userData = useSelector((state: RootState) => state.userData)

    useEffect(() => {
        if (userData.jwt === '' || userData.role !== 'user' ) {
            navigate('/auth/login/candidate', { replace: true })
        }
    }, [navigate, user])

    return children
}
