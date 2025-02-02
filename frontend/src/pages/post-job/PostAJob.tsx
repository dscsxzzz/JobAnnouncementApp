import { useForm, SubmitHandler } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../state/store'

type Props = {}

enum Skills {
    React = 1,
    DotNet = 2,
    CSharp = 3,
    JavaScript = 4,
}

enum Category {
    Frontend = 1,
    Backend = 2,
    Fullstack = 3,
    DevOps = 4,
}

enum Experience {
    Senior = 1,
    Middle = 2,
    Junior = 3,
    Trainee = 4,
}

enum Benefit {
    'Health insurance' = 1,
    '401(k)' = 2,
    'Paid time off' = 3,
    'Remote work' = 4,
}

type FormFields = {
    categoryId: number
    salaryMin: number
    salaryMax: number
    description: string
    whatWeOffer: string
    expirationDate: Date
    experienceId: number
    location: string
    hybrid: boolean
    remote: boolean
    benefitIds: number[]
    skillIds: number[]
}

export default function PostAJob({}: Props) {
    const [selectedSkills, setSelectedSkills] = useState<number[]>([])
    const [selectedCategory, setSelectedCategory] = useState<number>(0)
    const [selectedExperience, setSelectedExperience] = useState<number>(0)
    const [selectedBenefits, setSelectedBenefits] = useState<number[]>([])
    const userData = useSelector((state: RootState) => state.userData)

    const {
        register,
        handleSubmit,
        setError,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>()

    const salaryMin = watch('salaryMin')

    useEffect(() => {
        setValue('skillIds', selectedSkills)
    }, [selectedSkills, setValue])

    const handleSkillToggle = (skillId: number) => {
        setSelectedSkills((prevSelectedSkills) =>
            prevSelectedSkills.includes(skillId)
                ? prevSelectedSkills.filter((id) => id !== skillId)
                : [...prevSelectedSkills, skillId]
        )
    }

    const handleCategoryToggle = (category: number) => {
        setValue('categoryId', category)
        setSelectedCategory(category)
    }

    const handleExperienceToggle = (experienceId: number) => {
        setValue('experienceId', experienceId)
        setSelectedExperience(experienceId)
    }

    useEffect(() => {
        setValue('benefitIds', selectedBenefits)
    }, [selectedBenefits, setValue])

    const handleBenefitToggle = (benefitId: number) => {
        setSelectedBenefits((prevSelectedBenefits) =>
            prevSelectedBenefits.includes(benefitId)
                ? prevSelectedBenefits.filter((id) => id !== benefitId)
                : [...prevSelectedBenefits, benefitId]
        )
    }

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        const parsedData = {
            ...data,
            salaryMin: parseFloat(data.salaryMin as unknown as string),
            expirationDate: new Date(data.expirationDate).toISOString(),
        }
        console.log(parsedData)
        try {
            const response = await fetch('http://localhost:5292/job-postings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userData.jwt}`,
                },
                body: JSON.stringify(parsedData),
            })
            if (!response.ok) {
                console.log('Error:', response)
                setError('root', { message: 'error' })
                return
            }
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

    const validateExpirationDate = (value: Date) => {
        console.log(value)
        const selectedDate = new Date(value)
        console.log(selectedDate)
        const currentDate = new Date()
        console.log(currentDate)
        const minDate = new Date(
            currentDate.setDate(currentDate.getDate() + 30)
        )
        console.log(minDate)
        console.log(selectedDate >= minDate)
        return (
            selectedDate >= minDate ||
            'Expiration date must be at least 30 days from now.'
        )
    }

    const buttonStyle = `rounded-lg text-white px-5 py-2 cursor-pointer transition duration-500 hover:text-black hover:bg-gray-600`

    return (
        <>
            <h1 className="mt-24 text-4xl font-bold text-gray-800 text-center">
                Post a JOB
            </h1>
            <div className="mx-auto w-3/4 bg-white shadow-lg rounded-lg p-8 mt-10">
                <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
                    <div className="flex flex-wrap gap-4 mb-5">
                        <div className="px-5 py-2 text-xl text-gray-800">
                            Choose category:
                        </div>
                        {Object.keys(Category)
                            .filter(
                                (key) => !isNaN(Number(Category[key as any]))
                            )
                            .map((key) => (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() =>
                                        handleCategoryToggle(
                                            Category[
                                                key as keyof typeof Category
                                            ]
                                        )
                                    }
                                    className={`${buttonStyle} ${selectedCategory === Category[key as keyof typeof Category] ? 'bg-blue-500' : 'bg-gray-800'}`}
                                >
                                    {key}
                                </button>
                            ))}
                    </div>
                    <input
                        className="mt-5 w-full rounded-lg bg-gray-800 px-5 py-3 text-white"
                        type="number"
                        placeholder="Salary Min"
                        {...register('salaryMin', {
                            required: 'This field is required.',
                            maxLength: {
                                value: 20,
                                message: 'Max length is 20 characters.',
                            },
                        })}
                    />
                    {errors.salaryMin && (
                        <p className="mt-1 text-red-500">
                            {errors.salaryMin.message}
                        </p>
                    )}
                    <input
                        className="mt-5 w-full rounded-lg bg-gray-800 px-5 py-3 text-white"
                        type="number"
                        placeholder="Salary Max"
                        {...register('salaryMax', {
                            required: 'This field is required.',
                            valueAsNumber: true,
                            validate: (value) =>
                                value > salaryMin ||
                                'Max salary must be greater than min salary',
                            maxLength: {
                                value: 20,
                                message: 'Max length is 20 characters.',
                            },
                        })}
                    />
                    {errors.salaryMax && (
                        <p className="mt-1 text-red-500">
                            {errors.salaryMax.message}
                        </p>
                    )}
                    <textarea
                        className="mt-5 w-full rounded-lg bg-gray-800 px-5 py-3 text-white"
                        placeholder="Description"
                        {...register('description', {
                            required: 'This field is required.',
                            maxLength: {
                                value: 500,
                                message: 'Max length is 500 characters.',
                            },
                        })}
                    />
                    {errors.description && (
                        <p className="mt-1 text-red-500">
                            {errors.description.message}
                        </p>
                    )}
                    <textarea
                        className="mt-5 w-full rounded-lg bg-gray-800 px-5 py-3 text-white"
                        placeholder="What We Offer"
                        {...register('whatWeOffer', {
                            required: 'This field is required.',
                            maxLength: {
                                value: 500,
                                message: 'Max length is 500 characters.',
                            },
                        })}
                    />
                    {errors.whatWeOffer && (
                        <p className="mt-1 text-red-500">
                            {errors.whatWeOffer.message}
                        </p>
                    )}
                    <input
                        className="mt-5 w-full rounded-lg bg-gray-800 px-5 py-3 text-white"
                        type="datetime-local"
                        placeholder="Expiration Date"
                        {...register('expirationDate', {
                            required: 'This field is required.',
                            validate: (value) => validateExpirationDate(value),
                        })}
                    />
                    {errors.expirationDate && (
                        <p className="mt-1 text-red-500">
                            {errors.expirationDate.message}
                        </p>
                    )}
                    <input
                        className="mt-5 w-full rounded-lg bg-gray-800 px-5 py-3 text-white"
                        type="text"
                        placeholder="Location"
                        {...register('location', {
                            required: 'This field is required.',
                            maxLength: {
                                value: 50,
                                message: 'Max length is 50 characters.',
                            },
                        })}
                    />
                    {errors.location && (
                        <p className="mt-1 text-red-500">
                            {errors.location.message}
                        </p>
                    )}
                    <div className="flex flex-wrap gap-4 mt-4 mb-5">
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
                                    className={`${buttonStyle} ${selectedSkills.includes(Skills[key as keyof typeof Skills]) ? 'bg-blue-500' : 'bg-gray-800'}`}
                                >
                                    {key === 'DotNet'
                                        ? '.Net'
                                        : key === 'CSharp'
                                          ? 'C#'
                                          : key}
                                </button>
                            ))}
                    </div>
                    <div className="flex flex-wrap gap-4 mb-5">
                        <div className="px-5 py-2 text-xl text-gray-800">
                            Choose Experience:
                        </div>
                        {Object.keys(Experience)
                            .filter(
                                (key) => !isNaN(Number(Experience[key as any]))
                            )
                            .map((key) => (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() =>
                                        handleExperienceToggle(
                                            Experience[
                                                key as keyof typeof Experience
                                            ]
                                        )
                                    }
                                    className={`${buttonStyle} ${selectedExperience === Experience[key as keyof typeof Experience] ? 'bg-blue-500' : 'bg-gray-800'}`}
                                >
                                    {key}
                                </button>
                            ))}
                    </div>
                    <div className="flex flex-wrap gap-4 mb-5">
                        <div className="px-5 py-2 text-xl text-gray-800">
                            Choose Benefit:
                        </div>
                        {Object.keys(Benefit)
                            .filter(
                                (key) => !isNaN(Number(Benefit[key as any]))
                            )
                            .map((key) => (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() =>
                                        handleBenefitToggle(
                                            Benefit[key as keyof typeof Benefit]
                                        )
                                    }
                                    className={`${buttonStyle} ${selectedBenefits.includes(Benefit[key as keyof typeof Benefit]) ? 'bg-blue-500' : 'bg-gray-800'}`}
                                >
                                    {key}
                                </button>
                            ))}
                    </div>
                    <div className="flex flex-wrap gap-4 mb-5">
                        <div className="px-5 py-2 text-xl text-gray-800">
                            Hybrid:
                        </div>
                        <button
                            type="button"
                            onClick={() => setValue('hybrid', true)}
                            className={`${buttonStyle} ${watch('hybrid') === true ? 'bg-blue-500' : 'bg-gray-800'}`}
                        >
                            Yes
                        </button>
                        <button
                            type="button"
                            onClick={() => setValue('hybrid', false)}
                            className={`${buttonStyle} ${watch('hybrid') === false ? 'bg-blue-500' : 'bg-gray-800'}`}
                        >
                            No
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-4 mb-5">
                        <div className="px-5 py-2 text-xl text-gray-800">
                            Remote:
                        </div>
                        <button
                            type="button"
                            onClick={() => setValue('remote', true)}
                            className={`${buttonStyle} ${watch('remote') === true ? 'bg-blue-500' : 'bg-gray-800'}`}
                        >
                            Yes
                        </button>
                        <button
                            type="button"
                            onClick={() => setValue('remote', false)}
                            className={`${buttonStyle} ${watch('remote') === false ? 'bg-blue-500' : 'bg-gray-800'}`}
                        >
                            No
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-5 rounded-lg bg-gray-800 xs:px-20 py-3 transition duration-500 hover:text-black hover:bg-gray-600 px-10"
                        >
                            {isSubmitting ? 'Loading...' : 'Post a JOB'}
                        </button>
                    </div>
                    {errors.root && (
                        <div className="text-xl rounded-lg bg-red-600 text-white p-2 mt-2">
                            {errors.root.message}
                        </div>
                    )}
                </form>
            </div>
        </>
    )
}
