import { PropsWithChildren, useEffect } from 'react'
import { useAuth } from '../AuthProvider'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../../state/store'
import { useSelector } from 'react-redux'

type ProtectedRouteProps = PropsWithChildren

export default function ProtectedRouteEmp({ children }: ProtectedRouteProps) {
    const user = useAuth()
    const navigate = useNavigate()
    const userData = useSelector((state: RootState) => state.userData)

    useEffect(() => {
        if (userData.jwt === '' || userData.role !== 'employer' ) {
            navigate('/auth/login/employer', { replace: true })
        }
    }, [navigate, user])

    return children
}
