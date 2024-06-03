import { useEffect } from "react"

type Props = {}

export default function Companies({}: Props) {
    
    useEffect(() => {
        fetch('http://localhost:8080/companies?haveJobs=true&page=1', {
            method: 'GET',
        }).then((response) => {
            if (!response.ok)
                console.log("ERROR")
            return response.json();
        }).then((data) => {
            console.log(data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])
    
    return (
        <>
            <div className="mt-40">Companies</div>
        </>
    )
}
