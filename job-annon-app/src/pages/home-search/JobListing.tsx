import useMediaQuery from '../../hooks/useMediaQuery.ts'

type Props = {
    jobPostingId: number
    description: string
    company: {
        name: string
    }
    skills: {
        name: string
    }[]
    category: {
        name: string
    }
    location: string
    salaryMin: number
    salaryMax: number
    remote: boolean
    hybrid: boolean
}

export default function JobListing({
    description,
    company,
    skills,
    category,
    location,
    salaryMin,
    salaryMax,
    remote,
    hybrid,
}: Props) {
    const isAboveMediumScreens = useMediaQuery('(min-width: 820px)')
    return (
        <div className={`${isAboveMediumScreens ? (`w-[800px]`) : (`w-[400px]`)} bg-white p-4 rounded-lg shadow-md flex items-center justify-between mb-4 hover:bg-slate-100 cursor-pointer`}>
            <div>
                <h2 className="text-xl text-gray-900 font-semibold">{description}</h2>
                <p className="text-gray-600">{company.name}</p>
                <div className="flex flex-wrap mt-2">
                    {skills.map((skill, index) => (
                        <span
                            key={index}
                            className="bg-gray-200 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
                        >
                            {skill.name}
                        </span>
                    ))}
                    <span className="bg-gray-200 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
                        {category.name}
                    </span>
                </div>
            </div>
            <div className="text-right">
                <p className="text-gray-800 font-semibold">{salaryMin} - {salaryMax}</p>
                <p className="text-gray-500">{location}</p>
                {remote && <p className="text-green-500">Remote</p>}
                {hybrid && <p className="text-green-500">Hybrid</p>}
            </div>
        </div>
    )
}
