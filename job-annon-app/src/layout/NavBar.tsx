import { Link } from 'react-router-dom'
import logo from '/src/assets/logo_w.png'
import { useState } from 'react'
import pol from '/src/assets/PL.svg'

type Props = {}

function NavBar({}: Props) {
    const [showDropdownLogin, setShowDropdownLogin] = useState(false)

    return (
        <nav className="bg-gray-900 text-white flex justify-between text-center border-2 border-gray-800">
            <div className="">
                <ul className="flex items-center">
                    <li className="px-4">
                        <Link to="/">
                            <img src={logo} alt="logo" className="w-20" />
                        </Link>
                    </li>
                    <li className="py-8 border-r-2 border-l-2 border-gray-800">
                        <Link
                            to="/"
                            className="text-white font-bold py-8 px-4 hover:border-b-4 border-blue-700"
                        >
                            JOB OFFERS
                        </Link>
                    </li>
                    <li className="py-8 border-r-2 border-gray-800">
                        <Link
                            to="/"
                            className="text-white font-bold py-8 px-4 hover:border-b-4 border-blue-700"
                        >
                            COMPANIES
                        </Link>
                    </li>
                    <li className="py-8 border-r-2 border-gray-800">
                        <Link
                            to="/"
                            className="text-white font-bold py-8 px-4 hover:border-b-4 border-blue-700"
                        >
                            MYSALARY
                            <span className="bg-red-600 text-xs rounded-full px-2 py-0.5 ml-2">
                                NEW
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="">
                <ul className="flex items-center">
                    <li className="py-8 border-l-2 border-gray-800">
                        <Link
                            to="/"
                            className="text-white font-bold py-8 px-4 hover:border-b-4 border-blue-700"
                        >
                            FOR EMPLOYERS
                        </Link>
                    </li>
                    <li className="py-8 border-l-2 border-gray-800">
                        <Link
                            to="/"
                            className="text-white font-bold py-8 px-4 hover:border-b-4 border-blue-700"
                        >
                            POST A JOB
                        </Link>
                    </li>
                    <li className="py-8 border-l-2 border-r-2 border-gray-800">
                        <span
                            onClick={() =>
                                setShowDropdownLogin(!showDropdownLogin)
                            }
                            className="text-white font-bold py-8 px-4 hover:border-b-4 border-blue-700 hover:cursor-pointer"
                        >
                            LOG IN ▼
                        </span>
                        {showDropdownLogin && (
                            <div className="absolute right-36 bg-gray-800 mt-8 py-2 w-64 border-2 border-gray-700">
                                <div className="text-white text-left py-4">
                                    <p className="font-bold px-4 pb-3">
                                        EMPLOYERS
                                    </p>
                                    <Link
                                        to="/employer-login"
                                        className="block hover:bg-gray-700 py-2 px-4"
                                    >
                                        Log in to Employer Panel
                                    </Link>
                                    <Link
                                        to="/employer-signup"
                                        className="block hover:bg-gray-700 py-2 px-4"
                                    >
                                        Sign up
                                    </Link>
                                </div>
                                <hr />
                                <div className="text-white text-left py-4">
                                    <p className="font-bold px-4 pb-3">
                                        CANDIDATES
                                    </p>
                                    <Link
                                        to="/candidate-login"
                                        className="block hover:bg-gray-700 py-2 px-4"
                                    >
                                        Log in to your profile
                                    </Link>
                                    <Link
                                        to="/candidate-signup"
                                        className="block hover:bg-gray-700 py-2 px-4"
                                    >
                                        Sign up
                                    </Link>
                                </div>
                            </div>
                        )}
                    </li>
                    <li className="">
                        <Link
                            to="/"
                            className="py-[30px] px-2 text-white font-bold flex border-b-4 hover:border-blue-700 border-gray-900"
                        >
                            <img src={pol} className="w-[30px] pr-2" />
                            PL, POL, PLN ▼
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar