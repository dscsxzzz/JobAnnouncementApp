import Home from './pages/home/Home.tsx'
import ErrorPage from './pages/error-page/ErrorPage.tsx'
import AuthLayout from './layout/AuthLayout.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import HomeSearch from './pages/home-search/HomeSearch.tsx'
import Companies from './pages/companies/Companies.tsx'
import CompanyInfo from './pages/companies/CompanyInfo.tsx'
import MySalary from './pages/my-salary/MySalary.tsx'
import ForEmployer from './pages/for-employer/ForEmployer.tsx'
import PostAJob from './pages/post-job/PostAJob.tsx'
import JobApplication from './pages/home/JobApplication.tsx'
import CandidateLogin from './pages/auth/candidate/CandidateLogin.tsx'
import CandidateRegister from './pages/auth/candidate/CandidateRegister.tsx'
import EmployerLogin from './pages/auth/employer/EmployerLogin.tsx'
import EmployerRegister from './pages/auth/employer/EmployerRegister.tsx'
import AuthProvider from './pages/auth/AuthProvider.tsx'
import ProtectedRouteCan from './pages/auth/candidate/ProtectedRouteCan.tsx'
import ProtectedRouteEmp from './pages/auth/employer/ProtectedRouteEmp.tsx'
import { RootState } from './state/store.ts'
import { useSelector } from 'react-redux'
import Profile from './pages/profile/Profile.tsx'
import CandidateProfile from './pages/profile/candidate/CandidateProfile.tsx'
import EmployerProfile from './pages/profile/employer/EmployerProfile.tsx'
import About from './pages/about/About.tsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <HomeSearch />,
            },
            {
                path: 'companies',
                element: <Companies />,
            },
            {
                path: 'mysalary',
                element: <MySalary />,
            },
            {
                path: 'employers',
                element: (
                    <ProtectedRouteEmp>
                        <ForEmployer />
                    </ProtectedRouteEmp>
                ),
            },
            {
                path: 'post-job',
                element: (
                    <ProtectedRouteEmp>
                        <PostAJob />
                    </ProtectedRouteEmp>
                ),
            },
            {
                path: 'profile',
                element: <Profile />,
                children: [
                    {
                        path: 'candidate',
                        element: (
                            <ProtectedRouteCan>
                                <CandidateProfile />
                            </ProtectedRouteCan>
                        ),
                    },
                    {
                        path: 'employer',
                        element: (
                            <ProtectedRouteEmp>
                                <EmployerProfile />
                            </ProtectedRouteEmp>
                        ),
                    },
                ],
            },
            {
                path: 'applications/company/:applicationId',
                element: <JobApplication />,
            },
            {
                path: 'about',
                element: <About />
            },
            {
                path: '/companies/:companyId',
                element: <CompanyInfo />
            }
        ],
    },
    {
        element: <AuthLayout />,
        path: 'auth',
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'login',
                children: [
                    {
                        path: 'candidate',
                        element: <CandidateLogin />,
                    },
                    {
                        path: 'employer',
                        element: <EmployerLogin />,
                    },
                ],
            },
            {
                path: 'register',
                children: [
                    {
                        path: 'candidate',
                        element: <CandidateRegister />,
                    },
                    {
                        path: 'employer',
                        element: <EmployerRegister />,
                    },
                ],
            },
        ],
    },
])

export default function App() {
    const userData = useSelector((state: RootState) => state.userData)
    return (
        <>
            <AuthProvider
                isSignedIn={
                    userData.jwt !== '' && userData.role !== '' ? true : false
                }
            >
                <RouterProvider router={router} />
            </AuthProvider>
        </>
    )
}
