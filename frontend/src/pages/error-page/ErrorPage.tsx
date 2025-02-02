import { Link, useRouteError } from 'react-router-dom'

interface ErrorWithStatus extends Error {
    statusText?: string
    statusCode?: number
}

export default function ErrorPage() {
    const error = useRouteError() as ErrorWithStatus
    console.error(error)

    return (
        <div className="flex items-center justify-center h-screen bg-slate-100">
            <div
                id="error-page"
                className="bg-white p-6 rounded shadow-lg text-center"
            >
                <h1 className="text-xl font-bold text-gray-900 mb-4">Oops!</h1>
                <p className="text-lg text-gray-700 mb-3">
                    Sorry, an unexpected error has occurred.
                </p>
                <p className="text-gray-600">
                    <i>
                        {error.statusText || error.message || error.statusCode}
                    </i>
                </p>
                <div className="pt-4">
                    <Link to="/" className="text-black">{"←"} Back to Home</Link>
                </div>
            </div>
        </div>
    )
}
