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
      const response = await fetch(`${apiUrl}/password-change/company`, {
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
      console.log('Success:', await response.text())
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
    <div>
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Change Password
      </h1>
      <form onSubmit={handleSubmit(onSubmitPass)}>
        {/* Old Password */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Old Password
          </label>
          <input
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <p className="mt-1 text-red-500">{errors.Password.message}</p>
          )}
        </div>

        {/* New Password */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            New Password
          </label>
          <input
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <p className="mt-1 text-red-500">{errors.NewPassword.message}</p>
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
            {isSubmitting ? 'Loading...' : 'Update'}
          </button>
        </div>
      </form>
    </div>
  )
}
