
type Props = {
    title: string
    company: string
    skills: string[]
    salary: string
    location: string
}

export default function JobListing({
    title,
    company,
    skills,
    salary,
    location,
}: Props) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between mb-4 w-[800px] hover:bg-slate-100 cursor-pointer">
            <div>
                <h2 className="text-xl text-gray-900 font-semibold">{title}</h2>
                <p className="text-gray-600">{company}</p>
                <div className="flex flex-wrap mt-2">
                    {skills.map((skill) => (
                        <span
                            key={skill}
                            className="bg-gray-200 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
            <div className="text-right">
                <p className="text-gray-800 font-semibold">{salary}</p>
                <p className="text-gray-500">{location}</p>
            </div>
        </div>
    )
}
