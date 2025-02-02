import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type FormFieldsPass = {
  Password: string
  NewPassword: string
}

type Props = {
  jwt: string
}

export default function CandidateProfileChagePass({ jwt }: Props) {
  const apiUrl = import.meta.env.REACT_APP_API_URL
  const [successChange, setSuccessChange] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFieldsPass>()

  const onSubmitPass: SubmitHandler<FormFieldsPass> = async (data) => {
    try {
      const response = await fetch(`${apiUrl}/password-change/user`, {
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
    <div className="max-w-md mx-auto bg-white p-8 mt-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Change Password
      </h1>
      <form onSubmit={handleSubmit(onSubmitPass)} className="space-y-4">
        {/* Old Password */}
        <div>
          <label htmlFor="old-password" className="block text-gray-700 mb-1">
            Old Password
          </label>
          <input
            id="old-password"
            type="password"
            placeholder="Enter old password"
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
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.Password && (
            <p className="mt-1 text-sm text-red-500">{errors.Password.message}</p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label htmlFor="new-password" className="block text-gray-700 mb-1">
            New Password
          </label>
          <input
            id="new-password"
            type="password"
            placeholder="Enter new password"
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
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.NewPassword && (
            <p className="mt-1 text-sm text-red-500">{errors.NewPassword.message}</p>
          )}
        </div>

        {/* Display error from the form submission */}
        {errors.root && (
          <div className="text-sm rounded bg-red-500 text-white p-2">
            {errors.root.message}
          </div>
        )}

        {/* Success message */}
        {successChange && (
          <div className="text-sm rounded bg-green-500 text-white p-2 text-center">
            Successfully!
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-4 rounded-lg bg-blue-600 text-white px-4 py-2 transition duration-500 hover:bg-blue-500"
        >
          {isSubmitting ? 'Loading...' : 'Update Password'}
        </button>
      </form>
    </div>
  )
}
