import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

type Props = {}

type JobPosting = {
    jobPostingId: number
    categoryId: number
    companyId: number
    salaryMin: number
    salaryMax: number
    description: string
    whatWeOffer: string
    expirationDate: string
    rowCreated: string
    experienceId: number
    location: string
    hybrid: boolean
    remote: boolean
    company: {
        companyId: number
        name: string
        address: string
        email: string
        linkToSite: string
        availableJobs: number
    }
    experience: {
        experienceId: number
        name: string
    }
    category: {
        categoryId: number
        name: string
    }
    benefits: {
        benefitId: number
        name: string
    }[]
    skills: {
        skillId: number
        name: string
    }[]
}

type CompanyData = {
    companyId: number
    name: string
    address: string
    email: string
    linkToSite: string
    jobPostings: JobPosting[]
}

export default function CompanyInfo({}: Props) {
    const apiUrl = import.meta.env.REACT_APP_API_URL
    const params = useParams()
    const [companyData, setCompanyData] = useState<CompanyData | null>(null)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`${apiUrl}/companies/${params.companyId}`, {
            method: 'GET',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then((data) => {
                console.log('Raw data:', data)
                setCompanyData(data)
            })
            .catch((error) => {
                console.error('error', error)
                setError(error.message)
            })
    }, [params.companyId])

    if (error) {
        return (
            <div className="text-red-500 text-center mt-5">Error: {error}</div>
        )
    }

    if (!companyData) {
        return <div className="text-center mt-5">Loading...</div>
    }

    return (
        <div className="container mx-auto mt-24 p-5">
            <div className="bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-5">
                    {companyData.name}
                </h1>
                <div className="text-center mb-8">
                    <p className="text-xl">
                        <strong>Address:</strong> {companyData.address}
                    </p>
                    <p className="text-xl">
                        <strong>Email:</strong> {companyData.email}
                    </p>
                    <p className="text-xl">
                        <strong>Website:</strong>{' '}
                        <a
                            href={companyData.linkToSite}
                            className="text-blue-500 hover:underline"
                        >
                            {companyData.linkToSite}
                        </a>
                    </p>
                </div>
                <h2 className="text-3xl font-semibold text-gray-800 mb-5">
                    Job Postings
                </h2>
                {companyData.jobPostings.map((job) => (
                    <>
                        <div
                            key={job.jobPostingId}
                            className="mb-8 p-5 border border-gray-300 rounded-lg shadow-sm"
                        >
                            <h3 className="text-2xl font-semibold text-gray-700 mb-3">
                                {job.category.name} ({job.experience.name})
                            </h3>
                            <p className="text-lg mb-2">
                                <strong>Location:</strong> {job.location}
                            </p>
                            <p className="text-lg mb-2">
                                <strong>Salary:</strong> ${job.salaryMin} - $
                                {job.salaryMax}
                            </p>
                            <p className="text-lg mb-2">
                                <strong>Description:</strong> {job.description}
                            </p>
                            <p className="text-lg mb-2">
                                <strong>What We Offer:</strong>{' '}
                                {job.whatWeOffer}
                            </p>
                            <p className="text-lg mb-2">
                                <strong>Remote:</strong>{' '}
                                {job.remote ? 'Yes' : 'No'}
                            </p>
                            <p className="text-lg mb-2">
                                <strong>Hybrid:</strong>{' '}
                                {job.hybrid ? 'Yes' : 'No'}
                            </p>
                            <p className="text-lg mb-2">
                                <strong>Expiration Date:</strong>{' '}
                                {new Date(
                                    job.expirationDate
                                ).toLocaleDateString()}
                            </p>
                            <div className="mb-3">
                                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                                    Benefits:
                                </h4>
                                <ul className="list-disc list-inside">
                                    {job.benefits.map((benefit) => (
                                        <li
                                            key={benefit.benefitId}
                                            className="text-lg"
                                        >
                                            {benefit.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                                    Skills:
                                </h4>
                                <ul className="list-disc list-inside">
                                    {job.skills.map((skill) => (
                                        <li
                                            key={skill.skillId}
                                            className="text-lg"
                                        >
                                            {skill.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate(`/applications/company/${job.jobPostingId}`)}
                            className="block mx-auto mt-5 rounded-lg bg-blue-600 text-white xs:px-20 py-3 transition duration-500 hover:text-white hover:bg-blue-800 px-10"
                        >
                            Apply
                        </button>
                    </>
                ))}
            </div>
        </div>
    )
}
