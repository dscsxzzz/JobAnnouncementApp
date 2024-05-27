import { useState, useEffect, useRef } from 'react'

type Props = {}

export default function SearchBar({}: Props) {
    const [selected, setSelected] = useState<boolean>(false)
    const categories = ['Backend', 'Frontend', 'Fullstack', 'Mobile']
    const technologies = ['C#', 'Git', 'JavaScript', '.NET']
    const locations = ['Remote', 'Hybrid', 'Field work', 'Warsaw']
    const salaries = ['>10k PLN', '>15k PLN', '>20k PLN', '>25k PLN']

    const ref = useRef<HTMLDivElement>(null)
    const ref2 = useRef<HTMLDivElement>(null)

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node) && ref2.current && !ref2.current.contains(event.target as Node)) {
            setSelected(false)
        }
    }

    useEffect(() => {
        if (selected) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            console.log('should be true1', selected)
        }
    }, [selected])

    return (
        <>
            <div className="flex justify-center p-2">
                <div
                ref={ref2}
                    className="w-1/2"
                    onClick={() => {
                        if (!selected) {
                            setSelected(true)
                            console.log('should be true', selected)
                            return
                        }
                    }}
                >
                    <input
                        type="text"
                        placeholder="15673 offers"
                        className="p-2 rounded-md w-full max-w-xl bg-white text-gray-800 focus:outline-none"
                    />
                </div>
                {selected && (
                    <div
                        ref={ref}
                        className="absolute mt-10 bg-white py-2 w-[576px] border-2 rounded-md"
                    >
                        <div className="p-4">
                            {/* TODO: try to take last searches from local storage */}
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold mb-2">
                                    Last searches
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded">
                                        Backend
                                    </div>
                                    <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded">
                                        C#
                                    </div>
                                    <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded">
                                        Backend
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold mb-2">
                                    Categories
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((category) => (
                                        <div
                                            key={category}
                                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded cursor-pointer"
                                        >
                                            {category}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-lg font-semibold mb-2">
                                    Technologies
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {technologies.map((tech) => (
                                        <div
                                            key={tech}
                                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded cursor-pointer"
                                        >
                                            {tech}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-lg font-semibold mb-2">
                                    Locations
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {locations.map((location) => (
                                        <div
                                            key={location}
                                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded cursor-pointer"
                                        >
                                            {location}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-lg font-semibold mb-2">
                                    Salaries
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {salaries.map((salary) => (
                                        <div
                                            key={salary}
                                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded cursor-pointer"
                                        >
                                            {salary}
                                        </div>
                                    ))}
                                    <div className="bg-gray-200 text-gray-800 px-3 py-1 rounded flex items-center">
                                        <span>Custom salary</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
