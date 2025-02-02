import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

type Props = {}

type Company = {
    companyId: number
    name: string
    address: string
    email: string
    linkToSite: string
    availableJobs: number
}

export default function Companies({}: Props) {
    const apiUrl = import.meta.env.REACT_APP_API_URL
    const [companies, setCompanies] = useState<Company[]>([])
    const [searchParams, setSearchParams] = useSearchParams({
        haveJobs: 'true',
        page: '1',
    })
    const haveJobs = searchParams.get('haveJobs') === 'true'
    const page = searchParams.get('page')
    const [inputPage, setInputPage] = useState(searchParams.get('page') || '1')

    const onClick = (haveJobs: boolean) => {
        console.log(haveJobs)
        setSearchParams(
            (p) => {
                p.set('haveJobs', `${haveJobs}`)
                return p
            },
            { replace: true }
        )
        console.log(haveJobs)
    }

    useEffect(() => {
        onFetch()
    }, [haveJobs])

    const onFetch = async () => {
        try {
            const response = await fetch(
                `${apiUrl}/companies?haveJobs=${haveJobs}&page=${page}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            if (!response.ok) {
                console.error('ERROR')
            }
            const result = await response.json()
            console.log(result)
            setCompanies(result)
        } catch (error) {
            console.error
            return
        }
    }

    const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputPage(e.target.value)
    }

    const handlePageSubmit = () => {
        const num = Number.parseInt(inputPage)
        if (num >= 1) {
            setSearchParams({ page: inputPage })
        } else {
            setInputPage('1')
            setSearchParams({ page: '1' })
        }
    }

    return (
        <>
            <div className="flex flex-col min-h-[80vh]">
                <div className="container mx-auto mt-24 p-4">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
                        Companies {haveJobs ? 'With Jobs' : `Without Jobs`}
                    </h1>
                    <button
                        onClick={() => onClick(!haveJobs)}
                        className="block mx-auto mt-5 rounded-lg bg-blue-600 text-white xs:px-20 py-3 transition duration-500 hover:text-white hover:bg-blue-800 px-10"
                    >
                        {haveJobs
                            ? 'Show Companies Without Jobs'
                            : 'Show Companies With Jobs'}
                    </button>
                    <div className="mt-10 grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {companies.map((company) => (
                            <>
                                <Link to={`/companies/${company.companyId}`}>
                                    <div
                                        key={company.companyId}
                                        className="bg-white shadow-lg rounded-lg overflow-hidden"
                                    >
                                        <div className="p-5">
                                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                                {company.name}
                                            </h2>
                                            <p className="text-gray-600">
                                                {company.address}
                                            </p>
                                            <p className="text-gray-600">
                                                {company.email}
                                            </p>
                                            <a
                                                href={company.linkToSite}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:underline mt-2 block"
                                            >
                                                Visit Site
                                            </a>
                                            <p className="mt-2 text-gray-700">
                                                {company.availableJobs} jobs
                                                available
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex justify-center mb-4 mt-2">
                <input
                    type="number"
                    value={inputPage}
                    onChange={handlePageChange}
                    className="p-2 border rounded-lg mr-2"
                />
                <button
                    onClick={handlePageSubmit}
                    className="rounded-lg bg-gray-800 xs:px-20 py-3 transition duration-500 hover:text-black hover:bg-gray-600 px-10"
                >
                    Go to Page
                </button>
            </div>
        </>
    )
}
