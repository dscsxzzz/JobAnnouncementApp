import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../state/store'
import { useEffect, useState } from 'react'
import EmployerProfileApplication from '../profile/employer/EmployerProfileApplication'

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
    applications: {
        applicationId: number
        userId: number
        jobPostingId: number
        companyId: number
        applicationStatusId: number
        desiredSallaryMin: number
        desiredSallaryMax: number
        experienceYears: number
        whenCanStart: string
        previousWorkPlace: string
        messageToRecruiter: string
        applicationStatus: {
            applicationStatusId: number
            statusName: string
        }
        user: {
            userId: number
            name: string
            lastName: string
            address: string
            email: string
            phoneNumber: string
            skills: {
                skillId: number
                name: string
            }[]
        }
        jobPosting: {
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
    }[]
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

export default function ForEmployer() {
    const apiUrl = import.meta.env.REACT_APP_API_URL
    const [searchParams, setSearchParams] = useSearchParams({ page: '1' })
    const [applications, setApplications] = useState<JobPosting[]>([])
    const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({})
    const userData = useSelector((state: RootState) => state.userData)
    const page = searchParams.get('page')
    const [inputPage, setInputPage] = useState(searchParams.get('page') || '1')
    const [loader, setLoader] = useState<boolean>(true)
    const [newStatusIdChange, setNewStatusIdChange] = useState<boolean>(false)

    const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputPage(e.target.value)
    }

    const handlePageSubmit = () => {
        const num = Number.parseInt(inputPage)
        if (num >= 1){
            setSearchParams({ page: inputPage })
        } else {
            setInputPage('1')
            setSearchParams({ page: '1' })
        }
    }

    useEffect(() => {
        fetch(
            `${apiUrl}/job-postings/my-job-postings?page=${page}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${userData.jwt}`,
                },
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then((data) => {
                console.log('Raw data:', data)
                if (data && Array.isArray(data)) {
                    const mappedData = data.map((jobPosting: any) =>
                        mapJobPostingData(jobPosting)
                    )
                    setApplications(mappedData)
                    setLoader(false)
                } else {
                    throw new Error('Invalid data structure')
                }
            })
            .catch((error) => {
                console.error('error', error)
            })
    }, [page, userData.jwt, newStatusIdChange])

    const mapJobPostingData = (jobPosting: any): JobPosting => {
        return {
            jobPostingId: jobPosting.jobPostingId,
            categoryId: jobPosting.categoryId,
            companyId: jobPosting.companyId,
            salaryMin: jobPosting.salaryMin,
            salaryMax: jobPosting.salaryMax,
            description: jobPosting.description,
            whatWeOffer: jobPosting.whatWeOffer,
            expirationDate: jobPosting.expirationDate,
            rowCreated: jobPosting.rowCreated,
            experienceId: jobPosting.experienceId,
            location: jobPosting.location,
            hybrid: jobPosting.hybrid,
            remote: jobPosting.remote,
            applications: jobPosting.applications.map((application: any) => ({
                applicationId: application.applicationId,
                userId: application.userId,
                jobPostingId: application.jobPostingId,
                companyId: application.companyId,
                applicationStatusId: application.applicationStatusId,
                desiredSallaryMin: application.desiredSallaryMin,
                desiredSallaryMax: application.desiredSallaryMax,
                experienceYears: application.experienceYears,
                whenCanStart: application.whenCanStart,
                previousWorkPlace: application.previousWorkPlace,
                messageToRecruiter: application.messageToRecruiter,
                applicationStatus: {
                    applicationStatusId:
                        application.applicationStatus.applicationStatusId,
                    statusName: application.applicationStatus.statusName,
                },
                user: {
                    userId: application.user.userId,
                    name: application.user.name,
                    lastName: application.user.lastName,
                    address: application.user.address,
                    email: application.user.email,
                    phoneNumber: application.user.phoneNumber,
                    skills: application.user.skills.map((skill: any) => ({
                        skillId: skill.skillId,
                        name: skill.name,
                    })),
                },
                jobPosting: {
                    jobPostingId: application.jobPosting.jobPostingId,
                    categoryId: application.jobPosting.categoryId,
                    companyId: application.jobPosting.companyId,
                    salaryMin: application.jobPosting.salaryMin,
                    salaryMax: application.jobPosting.salaryMax,
                    description: application.jobPosting.description,
                    whatWeOffer: application.jobPosting.whatWeOffer,
                    expirationDate: application.jobPosting.expirationDate,
                    rowCreated: application.jobPosting.rowCreated,
                    experienceId: application.jobPosting.experienceId,
                    location: application.jobPosting.location,
                    hybrid: application.jobPosting.hybrid,
                    remote: application.jobPosting.remote,
                    company: {
                        companyId: application.jobPosting.company.companyId,
                        name: application.jobPosting.company.name,
                        address: application.jobPosting.company.address,
                        email: application.jobPosting.company.email,
                        linkToSite: application.jobPosting.company.linkToSite,
                        availableJobs:
                            application.jobPosting.company.availableJobs,
                    },
                    experience: {
                        experienceId:
                            application.jobPosting.experience.experienceId,
                        name: application.jobPosting.experience.name,
                    },
                    category: {
                        categoryId: application.jobPosting.category.categoryId,
                        name: application.jobPosting.category.name,
                    },
                    benefits: application.jobPosting.benefits.map(
                        (benefit: any) => ({
                            benefitId: benefit.benefitId,
                            name: benefit.name,
                        })
                    ),
                    skills: application.jobPosting.skills.map((skill: any) => ({
                        skillId: skill.skillId,
                        name: skill.name,
                    })),
                },
            })),
            experience: {
                experienceId: jobPosting.experience.experienceId,
                name: jobPosting.experience.name,
            },
            category: {
                categoryId: jobPosting.category.categoryId,
                name: jobPosting.category.name,
            },
            benefits: jobPosting.benefits.map((benefit: any) => ({
                benefitId: benefit.benefitId,
                name: benefit.name,
            })),
            skills: jobPosting.skills.map((skill: any) => ({
                skillId: skill.skillId,
                name: skill.name,
            })),
        }
    }

    const handleStatusChange = (applicationId: number, newStatusId: number) => {
        console.log(
            `Application ID: ${applicationId}, New Status ID: ${newStatusId}`
        )
        fetch(`${apiUrl}/applications`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userData.jwt}`,
            },
            body: JSON.stringify({
                applicationId: `${applicationId}`,
                applicationStatusId: `${newStatusId}`,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                setNewStatusIdChange(!newStatusIdChange)
                return response.text()
            })
            .catch((error) => {
                console.error('error', error)
            })
    }

    const toggleExpand = (id: number) => {
        setExpanded((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    return (
        <>
            <h1 className="mt-28 text-4xl font-bold text-gray-800 text-center">
                Your applications COMPANY
            </h1>
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
            {loader && (
                <div className="mt-28 text-4xl font-bold text-gray-800 text-center">
                    Loading...
                </div>
            )}
            <div className="flex flex-col min-h-[55vh] mx-auto w-4/5 pt-4">
                {applications.map((application) => (
                    <div
                        key={application.jobPostingId}
                        className="border rounded-lg p-6 mb-4 shadow-lg"
                    >
                        <h2 className="text-2xl font-semibold mb-2">
                            {application.jobPostingId} {application.description}
                        </h2>
                        <p className="text-gray-600 mb-4">
                            {application.experience.name}
                        </p>
                        <p className="text-gray-800 font-medium mb-2">
                            Proposed Salary: ${application.salaryMin} - $
                            {application.salaryMax}
                        </p>
                        <p className="text-gray-600 mb-4">
                            Location: {application.location} - Hybrid:{' '}
                            {application.hybrid ? 'Yes' : 'No'} - Remote:{' '}
                            {application.remote ? 'Yes' : 'No'}
                        </p>
                        <h3 className="text-xl font-semibold mb-2">
                            What We Offer:
                        </h3>
                        <p className="text-gray-600 mb-4">
                            {application.whatWeOffer}
                        </p>
                        <h3 className="text-xl font-semibold mb-2">
                            Benefits:
                        </h3>
                        <ul className="list-disc list-inside text-gray-600 mb-4">
                            {application.benefits.map((benefit) => (
                                <li key={benefit.benefitId}>{benefit.name}</li>
                            ))}
                        </ul>
                        <h3 className="text-xl font-semibold mb-2">
                            Skills Required:
                        </h3>
                        <ul className="list-disc list-inside text-gray-600 mb-4">
                            {application.skills.map((skill) => (
                                <li key={skill.skillId}>{skill.name}</li>
                            ))}
                        </ul>
                        <p className="text-gray-600 mb-4">
                            Expiration Data:{' '}
                            {application.expirationDate.slice(0, 10)}{' '}
                            {application.expirationDate.slice(11, -1)}
                        </p>
                        <button
                            onClick={() =>
                                toggleExpand(application.jobPostingId)
                            }
                            className="text-blue-500 hover:underline mb-4"
                        >
                            {expanded[application.jobPostingId]
                                ? 'Hide Applications'
                                : 'View Applications'}
                        </button>
                        {expanded[application.jobPostingId] && (
                            <div>
                                <h3 className="text-xl font-semibold mb-4">
                                    Applications:
                                </h3>
                                {application.applications.map((app) => (
                                    <div
                                        key={app.applicationId}
                                        className="mb-4 p-4 border rounded-lg shadow"
                                    >
                                        <EmployerProfileApplication
                                            app={app}
                                        ></EmployerProfileApplication>
                                        <hr className='mt-3'/>
                                        <div className="mt-2">
                                            <label className="mr-2 font-bold text-blue-600">
                                                Set Status:
                                            </label>
                                            <select
                                                value={
                                                    app.applicationStatus
                                                        .applicationStatusId
                                                }
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        app.applicationId,
                                                        Number(e.target.value)
                                                    )
                                                }
                                                className="p-2 border rounded-lg"
                                            >
                                                <option value="1">Sent</option>
                                                <option value="2">Open</option>
                                                <option value="3">
                                                    Rejected
                                                </option>
                                                <option value="4">Offer</option>
                                            </select>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}
