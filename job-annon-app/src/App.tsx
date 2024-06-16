import Home from './pages/home/Home.tsx'
import ErrorPage from './pages/error-page/ErrorPage.tsx'
import AuthLayout from './layout/AuthLayout.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import HomeSearch from './pages/home-search/HomeSearch.tsx'
import Companies from './pages/companies/Companies.tsx'
import MySalary from './pages/my-salary/MySalary.tsx'
import ForEmployer from './pages/for-employer/ForEmployer.tsx'
import PostAJob from './pages/post-job/PostAJob.tsx'
import JobApplication from './pages/job-application/JobApplication.tsx'
import CandidateLogin from './pages/auth/candidate/CandidateLogin.tsx'
import CandidateRegister from './pages/auth/candidate/CandidateRegister.tsx'
import EmployerLogin from './pages/auth/employer/EmployerLogin.tsx'
import EmployerRegister from './pages/auth/employer/EmployerRegister.tsx'

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
                element: <ForEmployer />,
            },
            {
                path: 'post-job',
                element: <PostAJob />,
            },
            {
                path: 'applications/company/:applicationId',
                element: <JobApplication />,
            },
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
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}
