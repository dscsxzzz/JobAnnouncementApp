import SearchBar from './SearchBar.tsx'
import JobListing from './JobListing.tsx'

type Props = {}

export default function Home({}: Props) {
    const jobs = [
        {
            title: 'Senior Python Engineer',
            company: 'BYTEK | the martech of Datrix group',
            skills: ['Python', 'Architecture', 'Cloud computing', 'GCP'],
            salary: '21 287 - 25 545 PLN',
            location: 'Remote',
        },
        {
            title: '.NET Developer',
            company: 'AVENGA',
            skills: ['.NET', 'ASP', 'MVC', 'C#'],
            salary: '18 480 - 23 520 PLN',
            location: 'Białystok',
        },
        {
            title: 'Senior Python Engineer',
            company: 'BYTEK | the martech of Datrix group',
            skills: ['Python', 'Architecture', 'Cloud computing', 'GCP'],
            salary: '21 287 - 25 545 PLN',
            location: 'Remote',
        },
        {
            title: '.NET Developer',
            company: 'AVENGA',
            skills: ['.NET', 'ASP', 'MVC', 'C#'],
            salary: '18 480 - 23 520 PLN',
            location: 'Białystok',
        },
        {
            title: 'Senior Python Engineer',
            company: 'BYTEK | the martech of Datrix group',
            skills: ['Python', 'Architecture', 'Cloud computing', 'GCP'],
            salary: '21 287 - 25 545 PLN',
            location: 'Remote',
        },
    ]

    return (
        <>
            <div className="mb-10 bg-gray-900 text-center p-6">
                <h1 className="text-4xl	font-bold text-white">
                    Find your job here! We are the proffesionals!
                </h1>
                <SearchBar />
            </div>
            <div className="flex flex-col items-center">
                {jobs.map((job, index) => (
                    <JobListing key={index} {...job} />
                ))}
            </div>
        </>
    )
}
