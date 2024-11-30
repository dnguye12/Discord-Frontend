import { SignOutButton } from "@clerk/clerk-react"
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from "react-router-dom"

import LeftMenu from "./components/LeftMenu"

const HomePage = () => {
    const { isSignedIn, user, isLoaded } = useUser()
    const navigate = useNavigate()

    if(!isSignedIn) {
        navigate('/')
    }
    return (
        <div className="h-screen">
            <LeftMenu user={user}/>
            <h1>Home Page</h1>
            <SignOutButton />
        </div>

    )
}

export default HomePage