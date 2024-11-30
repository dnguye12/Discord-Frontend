import { SignInButton, SignOutButton, SignUpButton } from "@clerk/clerk-react"
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from "react-router-dom"

const PublicPage = () => {
    const { isSignedIn, user, isLoaded } = useUser()
    const navigate = useNavigate()

    if (isSignedIn) {
        navigate('/channels/@me')
    }
    return (
        <div>
            <h1>Public Page</h1>
            <SignInButton />
            <SignUpButton />
            <SignOutButton />
        </div>

    )
}

export default PublicPage