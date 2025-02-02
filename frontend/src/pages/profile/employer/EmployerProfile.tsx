import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { setUserData } from '../../../state/user-reducer/userSlice'
import EmployerProfileChangePass from './EmployerProfileChangePass'

type FormFields = {
  name: string
  address: string
  email: string
  linkToSite: string
}

export default function EmployerProfile() {
  const apiUrl = import.meta.env.REACT_APP_API_URL
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
  }, [userData, setValue])

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await fetch(`${apiUrl}/companies`, {
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
      console.log('Success:', await response.text())
    } catch (error) {
      console.error('Error:', error)
      setError('root', {
        type: 'manual',
        message:
          error instanceof Error ? error.message : 'An unknown error occurred',
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
        Change Your Company Data
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Company Data Form */}
        <div className="bg-white shadow rounded-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Company Name */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Company Name
              </label>
              <input
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <p className="mt-1 text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Address
              </label>
              <input
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <p className="mt-1 text-red-500">{errors.address.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                placeholder="Email"
                {...register('email', {
                  required: 'This field is required.',
                  pattern: {
                    value:
                      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address.',
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Company Website */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Company Website
              </label>
              <input
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <p className="mt-1 text-red-500">{errors.linkToSite.message}</p>
              )}
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
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-5 rounded-lg bg-blue-600 text-white px-8 py-3 transition duration-500 hover:bg-blue-500"
              >
                {isSubmitting ? 'Loading...' : 'Change Data'}
              </button>
            </div>
          </form>
        </div>

        {/* Password Change Form */}
        <div className="bg-white shadow rounded-lg p-8">
          <EmployerProfileChangePass jwt={userData.jwt} />
        </div>
      </div>
    </div>
  )
}
