import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

type FormFields = {
    Name: string
    Address: string
    Email: string
    Password: string
    LinkToSite: string
}

export default function EmployerRegister() {
    const [successRegistration, setSuccessRegistration] = useState<boolean>(false)
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>()

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log(data)
        try {
            const response = await fetch(
                'http://localhost:5292/auth/register/company',
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

            const result = await response.text()
            console.log('Success:', result)
            setSuccessRegistration(true)
            await new Promise((resolve) => setTimeout(resolve, 1500))
            navigate('/auth/login/employer')
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
        <div className="mx-auto w-1/2">
            <div className="flex justify-center">
                <h1 className="text-gray-800 text-4xl font-bold">
                    Sign Up Your Company
                </h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    className="mt-5 w-full rounded-lg bg-gray-800 px-5 py-3 text-white"
                    type="text"
                    placeholder="Company name"
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
                    placeholder="Link to company's website"
                    {...register('LinkToSite', {
                        required: 'This field is required.',
                        maxLength: {
                            value: 100,
                            message: 'Max length is 100 characters.',
                        },
                    })}
                />
                {errors.LinkToSite && (
                    <p className="mt-1 text-primary-500">
                        {errors.LinkToSite.message}
                    </p>
                )}
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
