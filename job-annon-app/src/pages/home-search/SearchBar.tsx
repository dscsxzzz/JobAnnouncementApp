import { useState, useEffect, useRef } from 'react'
import {
    NavigateOptions,
    URLSearchParamsInit,
    useSearchParams,
} from 'react-router-dom'
import useMediaQuery from '../../hooks/useMediaQuery.ts'

type Props = {
    setSearchParams: (
        nextInit?:
            | URLSearchParamsInit
            | ((prev: URLSearchParams) => URLSearchParamsInit),
        navigateOpts?: NavigateOptions
    ) => void
}

export default function SearchBar({ setSearchParams }: Props) {
    const [selected, setSelected] = useState<boolean>(false)
    const [searchParams] = useSearchParams()
    const [searched, setSearched] = useState<string[]>([])
    const categories = ['Frontend', 'Backend', 'Fullstack', 'DevOps']
    const skills = ['React', '.NET', 'C#', 'JavaScript']
    const salaries = ['>5k PLN', '>10k PLN', '>15k PLN', '>20k PLN']
    const isAboveMediumScreens = useMediaQuery('(min-width: 610px)')

    const ref = useRef<HTMLDivElement>(null)
    const ref2 = useRef<HTMLDivElement>(null)

    const handleClickOutside = (event: MouseEvent) => {
        if (
            ref.current &&
            !ref.current.contains(event.target as Node) &&
            ref2.current &&
            !ref2.current.contains(event.target as Node)
        ) {
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
        }
    }, [selected])

    useEffect(() => {
        setSearched([])
        searchParams.forEach((elem, key) => {
            if (key === 'category') {
                setSearched((prev) => [
                    ...prev,
                    categories[Number.parseInt(elem) - 1],
                ])
            } else if (key === 'skills') {
                setSearched((prev) => [
                    ...prev,
                    skills[Number.parseInt(elem) - 1],
                ])
            } else if (key === 'sallaryMin') {
                setSearched((prev) => [...prev, elem])
            } else if (key === 'hybrid') {
                if (elem === 'true') {
                    setSearched((prev) => [...prev, 'Hybrid'])
                } else {
                    setSearched((prev) => [...prev])
                }
            } else if (key === 'remote') {
                if (elem === 'true') {
                    setSearched((prev) => [...prev, 'Remote'])
                } else {
                    setSearched((prev) => [...prev])
                }
            }
        })
    }, [searchParams])

    const onClear = () => {
        setSearched([])
        setSearchParams(
            (p) => {
                p.delete('category')
                p.delete('skills')
                p.delete('remote')
                p.delete('hybrid')
                p.delete('sallaryMin')
                return p
            },
            { replace: true }
        )
    }

    return (
        <>
            <div className="flex justify-center p-2">
                <div
                    ref={ref2}
                    className="w-[576px]"
                    onClick={() => {
                        if (!selected) {
                            setSelected(true)
                            return
                        }
                    }}
                >
                    <div className="text-lg p-2 rounded-md rounded-bl-md w-full max-w-xl bg-white text-gray-800 focus:outline-none cursor-pointer hover:text-white hover:bg-blue-500">
                        Filters
                    </div>
                </div>
                {selected && (
                    <>
                        <div
                            ref={ref}
                            className={`${isAboveMediumScreens ? `w-[576px]` : `w-[300px]`} absolute mt-10 bg-white py-2  border-2 rounded-md`}
                        >
                            <div className="p-4">
                                <div className="mb-6">
                                    <h2 className="text-lg font-semibold mb-2">
                                        Searches
                                    </h2>
                                    <div className="flex flex-wrap gap-2">
                                        {searched.map((p, index) => (
                                            <div
                                                key={index}
                                                className="bg-purple-100 text-purple-800 px-3 py-1 rounded cursor-pointer"
                                            >
                                                {p}
                                            </div>
                                        ))}
                                        <div
                                            className="bg-gray-200 text-gray-800 px-3 py-1 rounded cursor-pointer"
                                            onClick={onClear}
                                        >
                                            Clear
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="mb-6">
                                    <h2 className="text-lg font-semibold mb-2">
                                        Categories
                                    </h2>
                                    <div className="flex flex-wrap gap-2">
                                        {categories.map((category, index) => (
                                            <div
                                                key={category}
                                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded cursor-pointer"
                                                onClick={() =>
                                                    setSearchParams(
                                                        (p) => {
                                                            p.set(
                                                                'category',
                                                                `${index + 1}`
                                                            )
                                                            return p
                                                        },
                                                        { replace: true }
                                                    )
                                                }
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
                                        {skills.map((tech, index) => (
                                            <div
                                                key={tech}
                                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded cursor-pointer"
                                                onClick={() =>
                                                    setSearchParams(
                                                        (p) => {
                                                            p.append(
                                                                'skills',
                                                                `${index + 1}`
                                                            )
                                                            return p
                                                        },
                                                        { replace: true }
                                                    )
                                                }
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
                                        <div
                                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded cursor-pointer"
                                            onClick={() =>
                                                setSearchParams(
                                                    (p) => {
                                                        p.set(
                                                            'remote',
                                                            `${true}`
                                                        )
                                                        return p
                                                    },
                                                    { replace: true }
                                                )
                                            }
                                        >
                                            Remote
                                        </div>
                                        <div
                                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded cursor-pointer"
                                            onClick={() =>
                                                setSearchParams(
                                                    (p) => {
                                                        p.set(
                                                            'hybrid',
                                                            `${true}`
                                                        )
                                                        return p
                                                    },
                                                    { replace: true }
                                                )
                                            }
                                        >
                                            Hybrid
                                        </div>
                                        <div
                                            className="bg-gray-200 text-gray-800 px-3 py-1 rounded cursor-pointer"
                                            onClick={() => (
                                                setSearchParams(
                                                    (p) => {
                                                        p.set(
                                                            'hybrid',
                                                            `${false}`
                                                        )
                                                        return p
                                                    },
                                                    { replace: true }
                                                ),
                                                setSearchParams(
                                                    (p) => {
                                                        p.set(
                                                            'remote',
                                                            `${false}`
                                                        )
                                                        return p
                                                    },
                                                    { replace: true }
                                                )
                                            )}
                                        >
                                            On Site
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h2 className="text-lg font-semibold mb-2">
                                        Salaries
                                    </h2>
                                    <div className="flex flex-wrap gap-2">
                                        {salaries.map((salary, index) => (
                                            <div
                                                key={salary}
                                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded cursor-pointer"
                                                onClick={() =>
                                                    setSearchParams(
                                                        (p) => {
                                                            p.set(
                                                                'sallaryMin',
                                                                `${index === 0 ? 5000 : `${index === 1 ? 10000 : `${index === 2 ? 15000 : 20000}`}`}`
                                                            )
                                                            return p
                                                        },
                                                        { replace: true }
                                                    )
                                                }
                                            >
                                                {salary}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
