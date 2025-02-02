import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserData } from '../../state/user-reducer/userSlice'



export default function Profile() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logOut = () => {
        dispatch(setUserData({ jwt: '', role: '' , data: {}}))
        localStorage.clear()
        navigate('/')
    }

    return (
        <>
            <div className="flex flex-col min-h-[65vh]">
                <div className="mt-20">
                    <button
                        onClick={logOut}
                        className="m-5 rounded-lg bg-gray-800 xs:px-20 py-3 transition duration-500 hover:text-black hover:bg-gray-600 px-10"
                    >
                        Log Out
                    </button>
                    <div className="flex-grow mt-20">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}
