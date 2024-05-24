import SearchBar from "./SearchBar.tsx"

type Props = {}

export default function Home({}: Props) {
    return (
        <>
            <div className="mb-20 bg-gray-900 text-center p-6">
                <h1 className="text-4xl	font-bold text-white">
                    Find your job here! We are the proffesionals!
                </h1>
                <SearchBar />
            </div>
        </>
    )
}
