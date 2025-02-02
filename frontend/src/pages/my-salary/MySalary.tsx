import { useState } from 'react'

type Props = {}

const salaryRanges = [
    { minExperience: 0, maxExperience: 2, salary: 1000 },
    { minExperience: 2, maxExperience: 4, salary: 2000 },
    { minExperience: 4, maxExperience: 6, salary: 3000 },
    { minExperience: 6, maxExperience: 8, salary: 4000 },
    { minExperience: 8, maxExperience: 10, salary: 5000 },
    { minExperience: 10, maxExperience: Infinity, salary: '10000+' },
]

export default function MySalary({}: Props) {
    const [experience, setExperience] = useState<number | null>(null)
    const [salary, setSalary] = useState<number | string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value)
        if (!isNaN(value)) {
            setExperience(value)
            const range = salaryRanges.find(
                (r) => value >= r.minExperience && value < r.maxExperience
            )
            setSalary(range ? range.salary : null)
        } else {
            setExperience(null)
            setSalary(null)
        }
    }

    return (
        <div className="flex flex-col min-h-[73vh]">
            <div className="container mx-auto mt-24 p-4">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
                    My Salary
                </h1>
                <div className="mx-auto w-1/2 bg-white shadow-lg rounded-lg p-8">
                    <label
                        htmlFor="experience"
                        className="block text-xl font-medium text-gray-700 mb-2"
                    >
                        Enter your experience (in years):
                    </label>
                    <input
                        type="number"
                        id="experience"
                        className="mt-2 w-full rounded-lg bg-gray-200 px-5 py-3 text-gray-800"
                        onChange={handleChange}
                        placeholder="Enter years of experience"
                    />
                    {salary !== null && (
                        <div className="mt-4 text-xl text-gray-800">
                            For {experience} years, your estimated salary is:{' '}
                            <span className="font-bold">${salary}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
