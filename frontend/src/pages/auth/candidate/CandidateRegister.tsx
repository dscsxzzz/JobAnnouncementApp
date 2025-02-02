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
  const [successRegistration, setSuccessRegistration] = useState<boolean>(false)
  const [selectedSkills, setSelectedSkills] = useState<number[]>([])
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>()

  // Whenever selectedSkills changes, update the form value.
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
      const response = await fetch(`${apiUrl}/auth/register/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

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

  // Button style for skill toggles.
  const buttonStyle =
    'rounded-lg px-5 py-2 cursor-pointer transition duration-500 font-medium text-white'

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Candidate Sign Up</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Name"
              {...register('Name', {
                required: 'This field is required.',
                maxLength: {
                  value: 20,
                  message: 'Max length is 20 characters.',
                },
              })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.Name && (
              <p className="mt-1 text-sm text-red-500">{errors.Name.message}</p>
            )}
          </div>
          {/* Last Name Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              {...register('LastName', {
                required: 'This field is required.',
                maxLength: {
                  value: 20,
                  message: 'Max length is 20 characters.',
                },
              })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.LastName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.LastName.message}
              </p>
            )}
          </div>
          {/* Password Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
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
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.Password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.Password.message}
              </p>
            )}
          </div>
          {/* Address Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Address
            </label>
            <input
              type="text"
              placeholder="Address"
              {...register('Address', {
                required: 'This field is required.',
                maxLength: {
                  value: 50,
                  message: 'Max length is 50 characters.',
                },
              })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.Address && (
              <p className="mt-1 text-sm text-red-500">
                {errors.Address.message}
              </p>
            )}
          </div>
          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              {...register('Email', {
                required: 'This field is required.',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address.',
                },
              })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.Email && (
              <p className="mt-1 text-sm text-red-500">{errors.Email.message}</p>
            )}
          </div>
          {/* Phone Number Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Phone Number"
              {...register('PhoneNumber', {
                required: 'This field is required.',
                maxLength: {
                  value: 15,
                  message: 'Max length is 15 characters.',
                },
              })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.PhoneNumber && (
              <p className="mt-1 text-sm text-red-500">
                {errors.PhoneNumber.message}
              </p>
            )}
          </div>
          {/* Skills Toggle */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Choose Skills:
            </label>
            <div className="flex flex-wrap gap-4">
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
                    className={`${buttonStyle} ${
                      selectedSkills.includes(
                        Skills[key as keyof typeof Skills]
                      )
                        ? 'bg-blue-500'
                        : 'bg-gray-800'
                    }`}
                  >
                    {key === 'DotNet'
                      ? '.Net'
                      : key === 'CSharp'
                      ? 'C#'
                      : key}
                  </button>
                ))}
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-300"
            >
              {isSubmitting ? 'Loading...' : 'Sign Up'}
            </button>
          </div>
          {errors.root && (
            <div className="text-center text-lg rounded-lg bg-red-600 text-white p-2 mt-2">
              {errors.root.message}
            </div>
          )}
          {successRegistration && (
            <div className="text-center text-lg rounded-lg bg-green-600 text-white p-2 mt-2">
              Successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
