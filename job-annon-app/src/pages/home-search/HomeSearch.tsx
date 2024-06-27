import SearchBar from '../home-search/SearchBar.tsx'
import JobListing from '../home-search/JobListing.tsx'
import { Link, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

type Props = {}

type JobsProp = {
    jobPostingId: number
    description: string
    company: {
        name: string
    }
    skills: {
        name: string
    }[]
    category: {
        name: string
    }
    location: string
    salaryMin: number
    salaryMax: number
    remote: boolean
    hybrid: boolean
}

export default function HomeSearch({}: Props) {
    const [searchParams, setSearchParams] = useSearchParams()
    const page = searchParams.get('page')
    const [inputPage, setInputPage] = useState(searchParams.get('page') || '1')
    const [jobs, setJobs] = useState<JobsProp[]>([])
    const mapJobProp = (jobPost: JobsProp): JobsProp => {
        return {
            jobPostingId: jobPost.jobPostingId,
            description: jobPost.description,
            company: {
                name: jobPost.company.name,
            },
            skills: jobPost.skills.map((skill: any) => ({
                name: skill.name,
            })),
            category: {
                name: jobPost.category.name,
            },
            location: jobPost.location,
            salaryMin: jobPost.salaryMin,
            salaryMax: jobPost.salaryMax,
            remote: jobPost.remote,
            hybrid: jobPost.hybrid,
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

    useEffect(() => {
        onClick()
    }, [searchParams, page])

    const onClick = async () => {
        const queryString = Array.from(searchParams.entries())
            .map(
                ([key, value]) =>
                    `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            )
            .join('&')

        const url = `http://localhost:5292/job-postings?${queryString}`

        console.log(url)

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!response.ok) {
                console.error('ERROR')
            } else {
                const res = await response.json()
                console.log(res)
                if (res && Array.isArray(res)) {
                    const mappedData = res.map((jobPost) => mapJobProp(jobPost))
                    setJobs(mappedData)
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className="flex flex-col min-h-[80vh]">
                <div className="mb-10 mt-10 bg-gray-900 text-center p-6 pt-28">
                    <h1 className="text-4xl	font-bold text-white">
                        Find your job here! We are the proffesionals!
                    </h1>
                    <SearchBar setSearchParams={setSearchParams} />
                </div>
                <div className="flex flex-col items-center">
                    {jobs.map((job, index) => (
                        <Link
                            key={index}
                            to={`applications/company/${job.jobPostingId}`}
                        >
                            <JobListing key={index} {...job} />
                        </Link>
                    ))}
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
            </div>
        </>
    )
}
