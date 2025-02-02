import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserData } from '../../state/user-reducer/userSlice'

export default function Profile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logOut = () => {
    dispatch(setUserData({ jwt: '', role: '', data: {} }))
    localStorage.clear()
    navigate('/')
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 flex justify-between items-center mt-20">
        <h1 className="text-xl font-bold text-gray-800">Profile</h1>
        <button
          onClick={logOut}
          className="rounded-lg bg-gray-600 px-4 py-2 transition duration-500 hover:bg-gray-500 hover:text-black"
        >
          Log Out
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
