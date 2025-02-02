import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { setUserData } from '../../../state/user-reducer/userSlice'
import CandidateProfileChagePass from './CandidateProfileChagePass.tsx'

type Props = {}

type ApplicationData = {
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
}

function mapApplicationData(data: any): ApplicationData {
    return {
        applicationId: data.applicationId,
        userId: data.userId,
        jobPostingId: data.jobPostingId,
        companyId: data.companyId,
        applicationStatusId: data.applicationStatusId,
        desiredSallaryMin: data.desiredSallaryMin,
        desiredSallaryMax: data.desiredSallaryMax,
        experienceYears: data.experienceYears,
        whenCanStart: data.whenCanStart,
        previousWorkPlace: data.previousWorkPlace,
        messageToRecruiter: data.messageToRecruiter,
        applicationStatus: {
            applicationStatusId: data.applicationStatus.applicationStatusId,
            statusName: data.applicationStatus.statusName,
        },
        user: {
            userId: data.user.userId,
            name: data.user.name,
            lastName: data.user.lastName,
            address: data.user.address,
            email: data.user.email,
            phoneNumber: data.user.phoneNumber,
            skills: data.user.skills.map((skill: any) => ({
                skillId: skill.skillId,
                name: skill.name,
            })),
        },
        jobPosting: {
            jobPostingId: data.jobPosting.jobPostingId,
            categoryId: data.jobPosting.categoryId,
            companyId: data.jobPosting.companyId,
            salaryMin: data.jobPosting.salaryMin,
            salaryMax: data.jobPosting.salaryMax,
            description: data.jobPosting.description,
            whatWeOffer: data.jobPosting.whatWeOffer,
            expirationDate: data.jobPosting.expirationDate,
            rowCreated: data.jobPosting.rowCreated,
            experienceId: data.jobPosting.experienceId,
            location: data.jobPosting.location,
            hybrid: data.jobPosting.hybrid,
            remote: data.jobPosting.remote,
            company: {
                companyId: data.jobPosting.company.companyId,
                name: data.jobPosting.company.name,
                address: data.jobPosting.company.address,
                email: data.jobPosting.company.email,
                linkToSite: data.jobPosting.company.linkToSite,
                availableJobs: data.jobPosting.company.availableJobs,
            },
            experience: {
                experienceId: data.jobPosting.experience.experienceId,
                name: data.jobPosting.experience.name,
            },
            category: {
                categoryId: data.jobPosting.category.categoryId,
                name: data.jobPosting.category.name,
            },
            benefits: data.jobPosting.benefits.map((benefit: any) => ({
                benefitId: benefit.benefitId,
                name: benefit.name,
            })),
            skills: data.jobPosting.skills.map((skill: any) => ({
                skillId: skill.skillId,
                name: skill.name,
            })),
        },
    }
}

enum Skills {
    React = 1,
    DotNet = 2,
    CSharp = 3,
    JavaScript = 4,
}

type FormFields = {
    name: string
    lastName: string
    address: string
    email: string
    phoneNumber: string
    skillIds: number[]
}

export default function CandidateProfile({}: Props) {
    const apiUrl = import.meta.env.REACT_APP_API_URL
    const [searchParams, setSearchParams] = useSearchParams({ page: '1' })
    const [applications, setApplications] = useState<ApplicationData[]>([])
    const userData = useSelector((state: RootState) => state.userData)
    const page = searchParams.get('page')
    const [selectedSkills, setSelectedSkills] = useState<number[]>([])
    const dispatch = useDispatch()
    const [successChange, setSuccessChange] = useState<boolean>(false)
    const [inputPage, setInputPage] = useState(searchParams.get('page') || '1')

    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>()

    const handleSkillToggle = (skillId: number) => {
        setSelectedSkills((prevSelectedSkills) =>
            prevSelectedSkills.includes(skillId)
                ? prevSelectedSkills.filter((id) => id !== skillId)
                : [...prevSelectedSkills, skillId]
        )
    }

    useEffect(() => {
        fetch(`${apiUrl}/applications/user?page=${page}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${userData.jwt}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    console.error('ERROR')
                }
                return response.json()
            })
            .then((data) => {
                const mappedData = data.map((application: any) =>
                    mapApplicationData(application)
                )
                setApplications(mappedData)
            })
            .catch((error) => {
                console.error('error', error)
            })
    }, [page, userData.jwt])

    useEffect(() => {
        setValue('name', userData.data.name)
        setValue('lastName', userData.data.lastName)
        setValue('address', userData.data.address)
        setValue('email', userData.data.email)
        setValue('phoneNumber', userData.data.phoneNumber)
        const skills = userData.data.skills.map(
            (skill: { skillId: number }) => skill.skillId
        )
        setSelectedSkills(skills)
        setValue('skillIds', skills)
    }, [])

    useEffect(() => {
        setValue('skillIds', selectedSkills)
    }, [selectedSkills, setValue])

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        console.log(data)
        console.log(selectedSkills)
        try {
            const response = await fetch(`${apiUrl}/users`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userData.jwt}`,
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                const contentType = response.headers.get('content-type')
                let errorMessage = 'Change data failed'

                if (
                    contentType &&
                    (contentType.indexOf('application/json') !== -1 ||
                        contentType.indexOf('application/problem+json') !== -1)
                ) {
                    const errorData = await response.json()
                    console.error('Error:', errorData)
                    if (errorData.errors) {
                        Object.keys(errorData.errors).forEach((field) => {
                            const messages = errorData.errors[field]
                            setError(field as keyof FormFields, {
                                type: 'manual',
                                message: messages.join(' '),
                            })
                        })
                    } else {
                        errorMessage = errorData.title || errorMessage
                    }
                } else {
                    errorMessage = await response.text()
                }

                setError('root', {
                    type: 'manual',
                    message: errorMessage,
                })

                return
            }

            dispatch(
                setUserData({
                    jwt: userData.jwt,
                    role: 'user',
                    data: {
                        name: data.name,
                        lastName: data.lastName,
                        address: data.address,
                        email: data.email,
                        phoneNumber: data.phoneNumber,
                        skills: selectedSkills,
                    },
                })
            )
            setSuccessChange(true)
            await new Promise((resolve) => setTimeout(resolve, 1500))
            setSuccessChange(false)
            const result = await response.text()
            console.log('Success:', result)
        } catch (error) {
            console.error('Error:', error)
            setError('root', {
                type: 'manual',
                message:
                    error instanceof Error
                        ? error.message
                        : 'An unknown error occurred',
            })
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

    const buttonStyle = `rounded-lg text-white px-5 py-2 cursor-pointer transition duration-500 hover:text-black hover:bg-gray-600`

    return (
        <>
            <h1 className="mt-24 text-4xl font-bold text-gray-800 text-center">
                Change your data
            </h1>
            <div className="mx-auto w-1/2 bg-white shadow-lg rounded-lg p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
                    <input
                        className="mt-5 w-full rounded-lg bg-gray-800 px-5 py-3 text-white"
                        type="text"
                        placeholder="Name"
                        {...register('name', {
                            required: 'This field is required.',
                            maxLength: {
                                value: 20,
                                message: 'Max length is 20 characters.',
                            },
                        })}
                    />
                    {errors.name && (
                        <p className="mt-1 text-red-500">
                            {errors.name.message}
                        </p>
                    )}
                    <input
                        className="mt-5 w-full rounded-lg bg-gray-800 px-5 py-3 text-white"
                        type="text"
                        placeholder="Last name"
                        {...register('lastName', {
                            required: 'This field is required.',
                            maxLength: {
                                value: 20,
                                message: 'Max length is 20 characters.',
                            },
                        })}
                    />
                    {errors.lastName && (
                        <p className="mt-1 text-red-500">
                            {errors.lastName.message}
                        </p>
                    )}
                    <input
                        className="mt-5 w-full rounded-lg bg-gray-800 px-5 py-3 text-white"
                        type="text"
                        placeholder="Address"
                        {...register('address', {
                            required: 'This field is required.',
                            maxLength: {
                                value: 50,
                                message: 'Max length is 50 characters.',
                            },
                        })}
                    />
                    {errors.address && (
                        <p className="mt-1 text-red-500">
                            {errors.address.message}
                        </p>
                    )}
                    <input
                        className="mt-5 w-full rounded-lg bg-gray-800 px-5 py-3 text-white"
                        type="email"
                        placeholder="Email"
                        {...register('email', {
                            required: 'This field is required.',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address.',
                            },
                        })}
                    />
                    {errors.email && (
                        <p className="mt-1 text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                    <input
                        className="mt-5 w-full rounded-lg bg-gray-800 px-5 py-3 text-white"
                        type="text"
                        placeholder="Phone number"
                        {...register('phoneNumber', {
                            required: 'This field is required.',
                            maxLength: {
                                value: 15,
                                message: 'Max length is 15 characters.',
                            },
                        })}
                    />
                    {errors.phoneNumber && (
                        <p className="mt-1 text-red-500">
                            {errors.phoneNumber.message}
                        </p>
                    )}
                    <div className="flex mt-4 gap-5">
                        <div className="px-5 py-2 text-xl text-gray-800">
                            Choose skills:
                        </div>
                        {Object.keys(Skills)
                            .filter((key) => !isNaN(Number(Skills[key as any])))
                            .map((key) => (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() =>
                                        handleSkillToggle(
                                            Skills[key as keyof typeof Skills]
                                        )
                                    }
                                    className={`${buttonStyle} ${
                                        selectedSkills.includes(
                                            Skills[key as keyof typeof Skills]
                                        )
                                            ? 'bg-blue-500'
                                            : 'bg-gray-800'
                                    }`}
                                >
                                    {key === 'DotNet'
                                        ? '.Net'
                                        : key === 'CSharp'
                                          ? 'C#'
                                          : key}
                                </button>
                            ))}
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-5 rounded-lg bg-gray-800 xs:px-20 py-3 transition duration-500 hover:text-black hover:bg-gray-600 px-10"
                        >
                            {isSubmitting ? 'Loading...' : 'Update'}
                        </button>
                    </div>
                    {errors.root && (
                        <div className="text-xl rounded-lg bg-red-600 text-white p-2 mt-2">
                            {errors.root.message}
                        </div>
                    )}
                    {successChange && (
                        <div className="text-xl rounded-lg bg-green-600 text-white p-2 mt-2 text-center">
                            Successfully!
                        </div>
                    )}
                </form>
                <CandidateProfileChagePass jwt={userData.jwt} />
            </div>
            <h1 className="mt-24 text-4xl font-bold text-gray-800 text-center">
                Your applications
            </h1>
            <div className="container mx-auto mt-10 grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-4">
                {applications.map((application) => (
                    <div
                        key={application.applicationId}
                        className="bg-white shadow-lg rounded-lg p-6"
                    >
                        <p className="text-lg font-bold text-green-500 mb-2">
                            Status: {application.applicationStatus.statusName}
                        </p>
                        <h2 className="text-xl font-bold text-gray-800 mb-1">
                            Application to {application.jobPosting.company.name}
                        </h2>
                        <p className="text-gray-600 mb-1">
                            <strong>Position:</strong>{' '}
                            {application.jobPosting.description}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <strong>Desired Salary:</strong> $
                            {application.desiredSallaryMin} - $
                            {application.desiredSallaryMax}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <strong>Experience:</strong>{' '}
                            {application.experienceYears} years
                        </p>
                        <p className="text-gray-600 mb-1">
                            <strong>When Can Start:</strong>{' '}
                            {application.whenCanStart}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <strong>Previous Work Place:</strong>{' '}
                            {application.previousWorkPlace}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <strong>Message to Recruiter:</strong>{' '}
                            {application.messageToRecruiter}
                        </p>
                        <h3 className="mt-2 text-lg font-semibold text-gray-800">
                            Job Posting Details
                        </h3>
                        <p className="text-gray-600 mb-1">
                            <strong>Location:</strong>{' '}
                            {application.jobPosting.location}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <strong>Salary:</strong> $
                            {application.jobPosting.salaryMin} - $
                            {application.jobPosting.salaryMax}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <strong>Hybrid:</strong>{' '}
                            {application.jobPosting.hybrid ? 'Yes' : 'No'}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <strong>Remote:</strong>{' '}
                            {application.jobPosting.remote ? 'Yes' : 'No'}
                        </p>
                        <h3 className="mt-2 text-lg font-semibold text-gray-800">
                            Company Details
                        </h3>
                        <p className="text-gray-600 mb-1">
                            <strong>Name:</strong>{' '}
                            {application.jobPosting.company.name}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <strong>Address:</strong>{' '}
                            {application.jobPosting.company.address}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <strong>Email:</strong>
                            <a
                                href={`mailto:${application.jobPosting.company.email}`}
                                className="text-blue-500 hover:underline"
                            >
                                {application.jobPosting.company.email}
                            </a>
                        </p>
                        <a
                            href={application.jobPosting.company.linkToSite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            Visit Site
                        </a>
                    </div>
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
        </>
    )
}
