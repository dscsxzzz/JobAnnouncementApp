import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { setUserData } from '../../../state/user-reducer/userSlice'
import EmployerProfileChangePass from './EmployerProfileChangePass.tsx'

type FormFields = {
    name: string
    address: string
    email: string
    linkToSite: string
}

export default function EmployerProfile() {
    const userData = useSelector((state: RootState) => state.userData)
    const [successChange, setSuccessChange] = useState<boolean>(false)
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>()

    useEffect(() => {
        setValue('name', userData.data.name)
        setValue('address', userData.data.address)
        setValue('email', userData.data.email)
        setValue('linkToSite', userData.data.linkToSite)
    }, [])

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        console.log(data)
        try {
            const response = await fetch('http://localhost:5292/companies', {
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
                        address: data.address,
                        email: data.email,
                        phoneNumber: data.linkToSite,
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

    return (
        <>
            <h1 className="mt-24 text-4xl font-bold text-gray-800 text-center">
                Change your company data
            </h1>
            <div className="mx-auto w-1/2 mb-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        className="mt-5 w-full rounded-lg bg-gray-800 px-5 py-3 text-white"
                        type="text"
                        placeholder="Company name"
                        {...register('name', {
                            required: 'This field is required.',
                            maxLength: {
                                value: 20,
                                message: 'Max length is 20 characters.',
                            },
                        })}
                    />
                    {errors.name && (
                        <p className="mt-1 text-primary-500">
                            {errors.name.message}
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
                        <p className="mt-1 text-primary-500">
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
                        <p className="mt-1 text-primary-500">
                            {errors.email.message}
                        </p>
                    )}
                    <input
                        className="mt-5 w-full rounded-lg bg-gray-800 px-5 py-3 text-white"
                        type="text"
                        placeholder="Link to company's website"
                        {...register('linkToSite', {
                            required: 'This field is required.',
                            maxLength: {
                                value: 100,
                                message: 'Max length is 100 characters.',
                            },
                        })}
                    />
                    {errors.linkToSite && (
                        <p className="mt-1 text-primary-500">
                            {errors.linkToSite.message}
                        </p>
                    )}
                    <div className="flex justify-center ">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-5 rounded-lg bg-gray-800 xs:px-20 py-3 transition duration-500 hover:text-black hover:bg-gray-600 px-10"
                        >
                            {isSubmitting ? 'Loading...' : 'Change data'}
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
                <EmployerProfileChangePass jwt={userData.jwt} />
            </div>
        </>
    )
}
