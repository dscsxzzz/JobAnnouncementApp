import { Link } from 'react-router-dom'
import logo from '/src/assets/logo_w.png'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../state/store'
import useMediaQuery from '../hooks/useMediaQuery.ts'

type Props = {}

function NavBar({}: Props) {
    const [showDropdownLogin, setShowDropdownLogin] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const ref2 = useRef<HTMLLIElement>(null)
    const userData = useSelector((state: RootState) => state.userData)
    const isAboveMediumScreens = useMediaQuery('(min-width: 820px)')
    const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false)

    const handleClickOutside = (event: MouseEvent) => {
        if (
            ref.current &&
            !ref.current.contains(event.target as Node) &&
            ref2.current &&
            !ref2.current.contains(event.target as Node)
        ) {
            setShowDropdownLogin(false)
        }
    }

    useEffect(() => {
        if (showDropdownLogin) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [showDropdownLogin])

    const style =
        'text-white font-bold lg:py-8 py-4 xl:px-4 px-1 hover:border-b-4 border-blue-700'
    const styleLi = 'lg:py-8 py-4 border-r-2 border-gray-800'
    const styleLi2 = 'lg:py-8 py-4 border-l-2 border-gray-800'

    return (
        <>
            <nav className="bg-gray-900 text-white flex justify-between text-center border-2 border-gray-800 fixed top-0 left-0 right-0 z-30">
                {isAboveMediumScreens && (
                    <>
                        <div className="">
                            <ul className="flex items-center">
                                <li className="px-4">
                                    <Link to="/">
                                        <img
                                            src={logo}
                                            alt="logo"
                                            className="lg:w-20 w-12"
                                        />
                                    </Link>
                                </li>
                                <li className={`${styleLi} border-l-2`}>
                                    <Link to="/" className={`${style}`}>
                                        JOB OFFERS
                                    </Link>
                                </li>
                                <li className={`${styleLi}`}>
                                    <Link
                                        to="/companies"
                                        className={`${style}`}
                                    >
                                        COMPANIES
                                    </Link>
                                </li>
                                <li className={`${styleLi}`}>
                                    <Link to="/mysalary" className={`${style}`}>
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
                                <li className={`${styleLi2}`}>
                                    <Link
                                        to="/employers"
                                        className={`${style}`}
                                    >
                                        FOR EMPLOYERS
                                    </Link>
                                </li>
                                <li className={`${styleLi2}`}>
                                    <Link to="/post-job" className={`${style}`}>
                                        POST A JOB
                                    </Link>
                                </li>
                                {userData.jwt === '' && userData.role === '' ? (
                                    <li
                                        ref={ref2}
                                        className={`${styleLi2} border-r-2`}
                                    >
                                        <span
                                            onClick={() =>
                                                setShowDropdownLogin(
                                                    !showDropdownLogin
                                                )
                                            }
                                            className="text-white font-bold lg:py-8 py-4 xl:px-4 px-1 hover:border-b-4 border-blue-700 hover:cursor-pointer"
                                        >
                                            LOG IN ▼
                                        </span>
                                        {showDropdownLogin && (
                                            <>
                                                <div
                                                    onClick={() =>
                                                        setShowDropdownLogin(
                                                            false
                                                        )
                                                    }
                                                    className="fixed inset-0 bg-gray-800 bg-opacity-50 mt-[90px] z-10"
                                                />
                                                <div
                                                    ref={ref}
                                                    className="absolute right-36 bg-gray-800 mt-8 py-2 w-64 border-2 border-gray-700 z-20"
                                                >
                                                    <div className="text-white text-left py-4">
                                                        <p className="font-bold px-4 pb-3">
                                                            EMPLOYERS
                                                        </p>
                                                        <Link
                                                            to="/auth/login/employer"
                                                            className="block hover:bg-gray-700 py-2 px-4"
                                                        >
                                                            Log in to Employer
                                                            Panel
                                                        </Link>
                                                        <Link
                                                            to="/auth/register/employer"
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
                                                            to="/auth/login/candidate"
                                                            className="block hover:bg-gray-700 py-2 px-4"
                                                        >
                                                            Log in to your
                                                            profile
                                                        </Link>
                                                        <Link
                                                            to="/auth/register/candidate"
                                                            className="block hover:bg-gray-700 py-2 px-4"
                                                        >
                                                            Sign up
                                                        </Link>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </li>
                                ) : (
                                    <li className={`${styleLi2} border-r-2`}>
                                        <Link
                                            to={
                                                userData.role === 'user'
                                                    ? '/profile/candidate'
                                                    : userData.role ===
                                                        'employer'
                                                      ? '/profile/employer'
                                                      : '/'
                                            }
                                            className={`${style}`}
                                        >
                                            PROFILE
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </>
                )}
                {!isAboveMediumScreens && (
                    <>
                        <div className="m-1">
                            <Link to="/">
                                <img
                                    src={logo}
                                    alt="logo"
                                    className="m-2 lg:w-20 w-12"
                                />
                            </Link>
                        </div>
                        <div className="m-5">
                            <button
                                onClick={() => setIsMenuToggled(!isMenuToggled)}
                                className="text-lg hover:border-b-4 border-blue-700"
                            >
                                Menu
                            </button>
                        </div>
                        {isMenuToggled && (
                            <>
                                <div className="fixed right-0 bottom-0 z-40 h-full w-[300px] bg-gray-700 drop-shadow-xl">
                                    {/* Close icon */}
                                    <div
                                        className="flex justify-end p-12 text-lg"
                                        onClick={() =>
                                            setIsMenuToggled(!isMenuToggled)
                                        }
                                    >
                                        Close
                                    </div>
                                    {/* Menu items */}
                                    <div className="ml-[33%] flex flex-col gap-10 text-2xl">
                                        <Link to="/" className={`${style}`}>
                                            JOB OFFERS
                                        </Link>

                                        <Link
                                            to="/companies"
                                            className={`${style}`}
                                        >
                                            COMPANIES
                                        </Link>

                                        <Link
                                            to="/mysalary"
                                            className={`${style}`}
                                        >
                                            MYSALARY
                                            <span className="bg-red-600 text-xs rounded-full px-2 py-0.5 ml-2">
                                                NEW
                                            </span>
                                        </Link>
                                        <Link
                                            to="/employers"
                                            className={`${style}`}
                                        >
                                            FOR EMPLOYERS
                                        </Link>
                                        <Link
                                            to="/post-job"
                                            className={`${style}`}
                                        >
                                            POST A JOB
                                        </Link>
                                        {userData.jwt === '' &&
                                        userData.role === '' ? (
                                            <>
                                                <span
                                                    onClick={() =>
                                                        setShowDropdownLogin(
                                                            !showDropdownLogin
                                                        )
                                                    }
                                                    className="text-white font-bold lg:py-8 py-4 xl:px-4 px-1 hover:border-b-4 border-blue-700 hover:cursor-pointer"
                                                >
                                                    LOG IN ▼
                                                </span>
                                                {showDropdownLogin && (
                                                    <>
                                                        <div
                                                            onClick={() =>
                                                                setShowDropdownLogin(
                                                                    false
                                                                )
                                                            }
                                                            className="fixed inset-0 bg-gray-800 bg-opacity-50 mt-[90px] z-10"
                                                        />
                                                        <div
                                                            ref={ref}
                                                            className="absolute right-60 bg-gray-800 mt-80 py-2 w-64 border-2 border-gray-700 z-20"
                                                        >
                                                            <div className="text-white text-left py-4">
                                                                <p className="font-bold px-4 pb-3">
                                                                    EMPLOYERS
                                                                </p>
                                                                <Link
                                                                    to="/auth/login/employer"
                                                                    className="block hover:bg-gray-700 py-2 px-4"
                                                                >
                                                                    Log in to
                                                                    Employer
                                                                    Panel
                                                                </Link>
                                                                <Link
                                                                    to="/auth/register/employer"
                                                                    className="block hover:bg-gray-700 py-2 px-4"
                                                                >
                                                                    Sign up
                                                                </Link>
                                                            </div>
                                                            <div className="text-white text-left py-4">
                                                                <p className="font-bold px-4 pb-3">
                                                                    CANDIDATES
                                                                </p>
                                                                <Link
                                                                    to="/auth/login/candidate"
                                                                    className="block hover:bg-gray-700 py-2 px-4"
                                                                >
                                                                    Log in to
                                                                    your profile
                                                                </Link>
                                                                <Link
                                                                    to="/auth/register/candidate"
                                                                    className="block hover:bg-gray-700 py-2 px-4"
                                                                >
                                                                    Sign up
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </>
                                        ) : (
                                            <Link
                                                to={
                                                    userData.role === 'user'
                                                        ? '/profile/candidate'
                                                        : userData.role ===
                                                            'employer'
                                                          ? '/profile/employer'
                                                          : '/'
                                                }
                                                className={`${style}`}
                                            >
                                                PROFILE
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}
            </nav>
        </>
    )
}

export default NavBar
