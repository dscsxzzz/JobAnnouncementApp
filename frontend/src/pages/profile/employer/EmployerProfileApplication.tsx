type ApplicationProp = {
    app: {
        applicationId: number
        userId: number
        jobPostingId: number
        companyId: number
        applicationStatusId: number
        desiredSallaryMin: number
        desiredSallaryMax: number
        experienceYears: number
        whenCanStart: string
        previousWorkPlace: string
        messageToRecruiter: string
        applicationStatus: {
            applicationStatusId: number
            statusName: string
        }
        user: {
            userId: number
            name: string
            lastName: string
            address: string
            email: string
            phoneNumber: string
            skills: {
                skillId: number
                name: string
            }[]
        }
        jobPosting: {
            jobPostingId: number
            categoryId: number
            companyId: number
            salaryMin: number
            salaryMax: number
            description: string
            whatWeOffer: string
            expirationDate: string
            rowCreated: string
            experienceId: number
            location: string
            hybrid: boolean
            remote: boolean
            company: {
                companyId: number
                name: string
                address: string
                email: string
                linkToSite: string
                availableJobs: number
            }
            experience: {
                experienceId: number
                name: string
            }
            category: {
                categoryId: number
                name: string
            }
            benefits: {
                benefitId: number
                name: string
            }[]
            skills: {
                skillId: number
                name: string
            }[]
        }
    }
}

export default function EmployerProfileApplication({ app }: ApplicationProp) {
    const statusColors: Record<string, string> = {
        'Sent': 'bg-blue-100 text-blue-800',
        'Opened': 'bg-green-100 text-green-800',
        'Rejected': 'bg-red-100 text-red-800',
        'Offer': 'bg-yellow-100 text-yellow-800',
    }

    const statusClass = statusColors[app.applicationStatus.statusName] || 'bg-gray-100 text-gray-800'

    return (
      <div>
        <h4 className="text-lg font-semibold mb-2">
          {app.user.name} {app.user.lastName}
        </h4>
        <p className="mb-2 font-bold">
          Status:{' '}
          <span
            className={`px-2 inline-flex text-l leading-5 font-semibold rounded-full ${statusClass}`}
          >
            {app.applicationStatus.statusName}
          </span>
        </p>
        <p className="text-gray-600 mb-2">Email: {app.user.email}</p>
        <p className="text-gray-600 mb-2">Phone: {app.user.phoneNumber}</p>
        <p className="text-gray-600 mb-2">Address: {app.user.address}</p>
        <p className="text-gray-600 mb-2">
          Desired Salary: ${app.desiredSallaryMin} - ${app.desiredSallaryMax}
        </p>
        <p className="text-gray-600 mb-2">Experience Years: {app.experienceYears}</p>
        <p className="text-gray-600 mb-2">When Can Start: {app.whenCanStart}</p>
        <p className="text-gray-600 mb-2">Previous Workplace: {app.previousWorkPlace}</p>
        <p className="text-gray-600 mb-2">Message to Recruiter: {app.messageToRecruiter}</p>
        <h5 className="text-md font-semibold mb-2">Skills:</h5>
        <ul className="list-disc list-inside text-gray-600">
          {app.user.skills.map((skill) => (
            <li key={skill.skillId}>{skill.name}</li>
          ))}
        </ul>
      </div>
    )
  }
  