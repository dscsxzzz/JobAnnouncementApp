import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../state/store'
import { useForm, SubmitHandler } from 'react-hook-form'

type Props = {}

type JobPostApp = {
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

type FormFields = {
    jobPostingId: number
    companyId: number
    desiredSallaryMin: number
    desiredSallaryMax: number
    experienceYears: number
    whenCanStart: string
    previousWorkPlace: string
    messageToRecruiter: string
}

export default function JobApplication({}: Props) {
    const apiUrl = import.meta.env.REACT_APP_API_URL
    const [applications, setApplications] = useState<JobPostApp[]>([])
    const userData = useSelector((state: RootState) => state.userData)
    const [apply, setApply] = useState<boolean>(false)
    const params = useParams()
    const [successChange, setSuccessChange] = useState<boolean>(false)

    const mapJobPostingData = (jobPosting: any): JobPostApp => {
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

    useEffect(() => {
        fetch(`${apiUrl}/job-postings/${params.applicationId}`, {
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
                if (data) {
                    let mappedData
                    if (Array.isArray(data)) {
                        mappedData = data.map((jobPosting: any) =>
                            mapJobPostingData(jobPosting)
                        )
                    } else {
                        mappedData = [mapJobPostingData(data)]
                    }
                    setApplications(mappedData)
                } else {
                    throw new Error('Invalid data structure')
                }
            })
            .catch((error) => {
                console.error('error', error)
            })
    }, [params.applicationId])

    const onClick = () => {
        if (userData.jwt !== '' && userData.role !== '' && userData.data) {
            setApply(true)
        }
    }

    const {
        register,
        handleSubmit,
        setError,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>()

    const desiredSallaryMin = watch('desiredSallaryMin')

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        const parsedData = {
            ...data,
            desiredSallaryMin: parseFloat(
                data.desiredSallaryMin as unknown as string
            ),
            desiredSallaryMax: parseFloat(
                data.desiredSallaryMax as unknown as string
            ),
            experienceYears: parseFloat(
                data.experienceYears as unknown as string
            ),
        }
        console.log(parsedData)
        try {
            const response = await fetch(`${apiUrl}/applications`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userData.jwt}`,
                },
                body: JSON.stringify(parsedData),
            })
            if (!response.ok) {
                const contentType = response.headers.get('content-type')
                let errorMessage = 'Change password failed'

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

    return (
        <>
            <div className="container mx-auto mt-24 min-h-[70vh] p-4">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
                    Job Application
                </h1>
                <div className="bg-white shadow-lg rounded-lg p-8 mb-10">
                    {applications.map((app, index) => (
                        <>
                            {setValue('jobPostingId', app.jobPostingId)}
                            {setValue('companyId', app.companyId)}
                            <div key={index} className="mb-6">
                                <div className="mb-4">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                        {app.description}
                                    </h2>
                                    <p className="text-gray-600 mb-1">
                                        <strong>Expires on:</strong>{' '}
                                        {new Date(
                                            app.expirationDate
                                        ).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-600 mb-1">
                                        <strong>Location:</strong>{' '}
                                        {app.location}
                                    </p>
                                    <p className="text-gray-600 mb-1">
                                        <strong>Salary:</strong> {app.salaryMin}{' '}
                                        - {app.salaryMax}
                                    </p>
                                    <p className="text-gray-600 mb-1">
                                        <strong>What We Offer:</strong>{' '}
                                        {app.whatWeOffer}
                                    </p>
                                    <p className="text-gray-600 mb-1">
                                        <strong>Experience:</strong>{' '}
                                        {app.experience.name}
                                    </p>
                                    <p className="text-gray-600 mb-1">
                                        <strong>Category:</strong>{' '}
                                        {app.category.name}
                                    </p>
                                    <div className="text-gray-600 mb-1">
                                        <strong>Benefits:</strong>{' '}
                                        {app.benefits.map((benefit, idx) => (
                                            <span
                                                key={idx}
                                                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                                            >
                                                {benefit.name}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="text-gray-600">
                                        <strong>Skills:</strong>{' '}
                                        {app.skills.map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                                            >
                                                {skill.name}
                                            </span>
                                        ))}
                                    </div>
                                    <Link to={`/companies/${app.companyId}`}>
                                        <p className="inline-block mx-auto w-30 mt-5 rounded-lg bg-blue-600 text-white xs:px-20 py-3 transition duration-500 hover:text-white hover:bg-blue-800 px-10">
                                            View Company
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
                <button
                    onClick={onClick}
                    className="block mx-auto mt-5 rounded-lg bg-blue-600 text-white xs:px-20 py-3 transition duration-500 hover:text-white hover:bg-blue-800 px-10"
                >
                    Apply
                </button>
                {apply && (
                    <div className="bg-white shadow-lg rounded-lg p-8 mt-10">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <input
                                    className="mt-2 w-full rounded-lg bg-gray-800 px-5 py-3 text-white"
                                    type="number"
                                    placeholder="Desired Salary Min"
                                    {...register('desiredSallaryMin', {
                                        required: 'This field is required.',
                                        maxLength: {
                                            value: 20,
                                            message:
                                                'Max length is 20 characters.',
                                        },
                                    })}
                                />
                                {errors.desiredSallaryMin && (
                                    <p className="mt-1 text-red-500">
                                        {errors.desiredSallaryMin.message}
                                    </p>
                                )}
                            </div>
                            <div className="mb-4">
                                <input
                                    className="mt-2 w-full rounded-lg bg-gray-800 px-5 py-3 text-white"
                                    type="number"
                                    placeholder="Desired Salary Max"
                                    {...register('desiredSallaryMax', {
                                        required: 'This field is required.',
                                        valueAsNumber: true,
                                        validate: (value) =>
                                            value > desiredSallaryMin ||
                                            'Max salary must be greater than min salary',
                                        maxLength: {
                                            value: 20,
                                            message:
                                                'Max length is 20 characters.',
                                        },
                                    })}
                                />
                                {errors.desiredSallaryMax && (
                                    <p className="mt-1 text-red-500">
                                        {errors.desiredSallaryMax.message}
                                    </p>
                                )}
                            </div>
                            <div className="mb-4">
                                <input
                                    className="mt-2 w-full rounded-lg bg-gray-800 px-5 py-3 text-white"
                                    type="number"
                                    placeholder="Experience Years"
                                    {...register('experienceYears', {
                                        required: 'This field is required.',
                                        maxLength: {
                                            value: 20,
                                            message:
                                                'Max length is 20 characters.',
                                        },
                                    })}
                                />
                                {errors.experienceYears && (
                                    <p className="mt-1 text-red-500">
                                        {errors.experienceYears.message}
                                    </p>
                                )}
                            </div>
                            <div className="mb-4">
                                <input
                                    className="mt-2 w-full rounded-lg bg-gray-800 px-5 py-3 text-white"
                                    type="text"
                                    placeholder="When Can Start"
                                    {...register('whenCanStart', {
                                        required: 'This field is required.',
                                        maxLength: {
                                            value: 20,
                                            message:
                                                'Max length is 20 characters.',
                                        },
                                    })}
                                />
                                {errors.whenCanStart && (
                                    <p className="mt-1 text-red-500">
                                        {errors.whenCanStart.message}
                                    </p>
                                )}
                            </div>
                            <div className="mb-4">
                                <input
                                    className="mt-2 w-full rounded-lg bg-gray-800 px-5 py-3 text-white"
                                    type="text"
                                    placeholder="Previous Work Place"
                                    {...register('previousWorkPlace', {
                                        required: 'This field is required.',
                                        maxLength: {
                                            value: 20,
                                            message:
                                                'Max length is 20 characters.',
                                        },
                                    })}
                                />
                                {errors.previousWorkPlace && (
                                    <p className="mt-1 text-red-500">
                                        {errors.previousWorkPlace.message}
                                    </p>
                                )}
                            </div>
                            <div className="mb-4">
                                <input
                                    className="mt-2 w-full rounded-lg bg-gray-800 px-5 py-3 text-white"
                                    type="text"
                                    placeholder="Message To Recruiter"
                                    {...register('messageToRecruiter', {
                                        required: 'This field is required.',
                                        maxLength: {
                                            value: 20,
                                            message:
                                                'Max length is 20 characters.',
                                        },
                                    })}
                                />
                                {errors.messageToRecruiter && (
                                    <p className="mt-1 text-red-500">
                                        {errors.messageToRecruiter.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="mt-5 rounded-lg bg-blue-600 xs:px-20 py-3 transition duration-500 text-white hover:bg-blue-800 px-10"
                                >
                                    {isSubmitting ? 'Loading...' : 'Apply'}
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
                    </div>
                )}
            </div>
        </>
    )
}
