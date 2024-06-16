import { Link, Outlet } from 'react-router-dom'
import Footer from './Footer'
import logo from '/src/assets/logo_w.png'

type Props = {}

export default function AuthLayout({}: Props) {
    return (
        <div className="flex flex-col min-h-screen">
            <nav className="bg-gray-900 text-white flex justify-between text-center border-2 border-gray-800">
                <div className="">
                    <ul className="flex items-center">
                        <li className="px-4">
                            <Link to="/">
                                <img src={logo} alt="logo" className="w-20" />
                            </Link>
                        </li>
                        <li className="py-8 border-l-2 border-gray-800">
                            <Link
                                to="/"
                                className="text-white font-bold py-8 px-4 hover:border-b-4 border-blue-700"
                            >
                                {'←'} BACK TO HOME
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
                <div className="flex-grow mt-20 mb-20">
                    <Outlet />
                </div>
            <Footer />
        </div>
    )
}
