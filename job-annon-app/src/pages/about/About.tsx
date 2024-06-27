
type Props = {}

export default function About({}: Props) {
    return (
        <>
            <div className="flex flex-col justify-center items-center min-h-[76vh]">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-10 mt-24">
                    About Us
                </h1>
                <div className="text-center text-xl">
                    TOP DEVELOPERS: OSTAP ZABANHALO, ANDRII KRECHUNIAK, ANDRII BALUKH
                </div>
            </div>
        </>
    );
}
