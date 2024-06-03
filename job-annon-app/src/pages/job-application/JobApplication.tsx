import { useParams } from 'react-router-dom'

type Props = {}

export default function JobApplication({}: Props) {
    const params = useParams()
    return (
        <>
            <div className="mt-24">JobApplication</div>
            <div>{params.applicationId}</div>
        </>
    )
}
