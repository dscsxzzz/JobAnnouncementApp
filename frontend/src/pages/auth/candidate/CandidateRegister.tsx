import { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

enum Skills {
    React = 1,
    DotNet = 2,
    CSharp = 3,
    JavaScript = 4,
}

type FormFields = {
    Name: string
    LastName: string
    Password: string
    Address: string
    Email: string
    PhoneNumber: string
    SkillIds: number[]
}

export default function CandidateRegister() {
    const apiUrl = import.meta.env.REACT_APP_API_URL
    const navigate = useNavigate()
    const [successRegistration, setSuccessRegistration] =
        useState<boolean>(false)
    const [selectedSkills, setSelectedSkills] = useState<number[]>([])
    const {
        register,
        handleSubmit,
        setValue,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>()

    useEffect(() => {
        setValue('SkillIds', selectedSkills)
    }, [selectedSkills, setValue])

    const handleSkillToggle = (skillId: number) => {
        setSelectedSkills((prevSelectedSkills) =>
            prevSelectedSkills.includes(skillId)
                ? prevSelectedSkills.filter((id) => id !== skillId)
                : [...prevSelectedSkills, skillId]
        )
    }

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        console.log(data)
        try {
            const response = await fetch(
                `${apiUrl}/auth/register/user`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            )

            if (!response.ok) {
                const contentType = response.headers.get('content-type')
                let errorMessage = 'Registration failed'
                console.log(contentType)
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

            const result = await response.json()
            console.log('Success:', result)
            setSuccessRegistration(true)
            await new Promise((resolve) => setTimeout(resolve, 1500))
            navigate('/auth/login/candidate')
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

    const buttonStyle = `rounded-lg text-white px-5 py-2 cursor-pointer transition duration-500 hover:text-black hover:bg-gray-600`

    return (
        <div className="mx-auto w-1/2">
            <div className="flex justify-center">
                <h1 className="text-gray-800 text-4xl font-bold">
                    Candidate Sign Up
                </h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    className="mt-5 w-full rounded-lg bg-gray-800 px-5 py-3 text-white"
                    type="text"
                    placeholder="Name"
                    {...register('Name', {
                        required: 'This field is required.',
                        maxLength: {
                            value: 20,
                            message: 'Max length is 20 characters.',
                        },
                    })}
                />
                {errors.Name && (
                    <p className="mt-1 text-primary-500">
                        {errors.Name.message}
                    </p>
                )}
                <input
                    className="mt-5 w-full rounded-lg bg-gray-800 px-5 py-3 text-white"
                    type="text"
                    placeholder="Last name"
                    {...register('LastName', {
                        required: 'This field is required.',
                        maxLength: {
                            value: 20,
                            message: 'Max length is 20 characters.',
                        },
                    })}
                />
                {errors.LastName && (
                    <p className="mt-1 text-primary-500">
                        {errors.LastName.message}
                    </p>
                )}
                <input
                    className="mt-5 w-full rounded-lg bg-gray-800 px-5 py-3 text-white"
                    type="password"
                    placeholder="Password"
                    {...register('Password', {
                        required: 'This field is required.',
                        minLength: {
                            value: 10,
                            message: 'Min length is 10 characters.',
                        },
                        maxLength: {
                            value: 100,
                            message: 'Max length is 100 characters.',
                        },
                    })}
                />
                {errors.Password && (
                    <p className="mt-1 text-primary-500">
                        {errors.Password.message}
                    </p>
                )}
                <input
                    className="mt-5 w-full rounded-lg bg-gray-800 px-5 py-3 text-white"
                    type="text"
                    placeholder="Address"
                    {...register('Address', {
                        required: 'This field is required.',
                        maxLength: {
                            value: 50,
                            message: 'Max length is 50 characters.',
                        },
                    })}
                />
                {errors.Address && (
                    <p className="mt-1 text-primary-500">
                        {errors.Address.message}
                    </p>
                )}
                <input
                    className="mt-5 w-full rounded-lg bg-gray-800 px-5 py-3 text-white"
                    type="email"
                    placeholder="Email"
                    {...register('Email', {
                        required: 'This field is required.',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address.',
                        },
                    })}
                />
                {errors.Email && (
                    <p className="mt-1 text-primary-500">
                        {errors.Email.message}
                    </p>
                )}
                <input
                    className="mt-5 w-full rounded-lg bg-gray-800 px-5 py-3 text-white"
                    type="text"
                    placeholder="Phone number"
                    {...register('PhoneNumber', {
                        required: 'This field is required.',
                        maxLength: {
                            value: 15,
                            message: 'Max length is 15 characters.',
                        },
                    })}
                />
                {errors.PhoneNumber && (
                    <p className="mt-1 text-primary-500">
                        {errors.PhoneNumber.message}
                    </p>
                )}
                <div className="flex mt-4 gap-5">
                    <div className="px-5 py-2 text-xl text-gray-800">
                        Choose skills:{' '}
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
                                {key === "DotNet" ? ".Net" : (key === "CSharp" ? "C#" : key)}
                            </button>
                        ))}
                </div>
                <div className="flex justify-center ">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-5 rounded-lg bg-gray-800 xs:px-20 py-3 transition duration-500 hover:text-black hover:bg-gray-600 px-10"
                    >
                        {isSubmitting ? 'Loading...' : 'Sign Up'}
                    </button>
                </div>
                {errors.root && (
                    <div className="text-xl rounded-lg bg-red-600 text-white p-2 mt-2">
                        {errors.root.message}
                    </div>
                )}
                {successRegistration && (
                    <div className="text-xl rounded-lg bg-green-600 text-white p-2 mt-2 text-center">
                        Successfully!
                    </div>
                )}
            </form>
        </div>
    )
}
