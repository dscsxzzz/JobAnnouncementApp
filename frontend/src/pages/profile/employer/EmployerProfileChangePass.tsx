import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type FormFieldsPass = {
    Password: string
    NewPassword: string
}

type Props = {
    jwt: string
}

export default function EmployerProfileChangePass({ jwt }: Props) {
    const [successChange, setSuccessChange] = useState<boolean>(false)
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormFieldsPass>()

    const onSubmitPass: SubmitHandler<FormFieldsPass> = async (data) => {
        console.log(data)
        try {
            const response = await fetch('http://localhost:5292/password-change/company', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`,
                },
                body: JSON.stringify(data),
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
                            setError(field as keyof FormFieldsPass, {
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
            <h1 className="text-gray-800 text-4xl font-bold text-center mt-6">Chage Password</h1>
            <form onSubmit={handleSubmit(onSubmitPass)}>
                <input
                    className="mt-5 w-full rounded-lg bg-gray-800 px-5 py-3 text-white"
                    type="password"
                    placeholder="Old password"
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
                    type="password"
                    placeholder="New Password"
                    {...register('NewPassword', {
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
                {errors.NewPassword && (
                    <p className="mt-1 text-primary-500">
                        {errors.NewPassword.message}
                    </p>
                )}
                <div className="flex justify-center ">
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
        </>
    )
}
