import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserData } from '../../../state/user-reducer/userSlice'

type FormFields = {
  Password: string
  Email: string
}

export default function EmployerLogin() {
  const apiUrl = import.meta.env.REACT_APP_API_URL
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [successLogin, setSuccessLogin] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>()

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await fetch(`${apiUrl}/auth/login/company`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const contentType = response.headers.get('content-type')
        let errorMessage = 'Login failed'

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

        setError('root', { type: 'manual', message: errorMessage })
        return
      }

      const result = await response.json()
      dispatch(
        setUserData({
          jwt: result.token,
          role: 'employer',
          data: result.company,
        })
      )
      setSuccessLogin(true)
      await new Promise((resolve) => setTimeout(resolve, 1500))
      navigate('/')
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
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Company Log In
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register('Email', {
                required: 'This field is required.',
                pattern: {
                  value:
                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address.',
                },
              })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.Email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.Email.message}
              </p>
            )}
          </div>
          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
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
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.Password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.Password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300"
          >
            {isSubmitting ? 'Loading...' : 'Log In'}
          </button>
          {errors.root && (
            <div className="mt-2 p-2 bg-red-600 text-white rounded-md text-center">
              {errors.root.message}
            </div>
          )}
          {successLogin && (
            <div className="mt-2 p-2 bg-green-600 text-white rounded-md text-center">
              Successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
