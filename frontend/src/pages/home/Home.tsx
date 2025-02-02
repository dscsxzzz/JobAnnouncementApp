import NavBar from '../../layout/NavBar.tsx'
import Footer from '../../layout/Footer.tsx'
import { Outlet } from 'react-router-dom'

type Props = {}

export default function Home({}: Props) {

    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
}
