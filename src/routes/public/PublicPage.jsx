import { useUser } from '@clerk/clerk-react'
import PublicHeader from "./components/PublicHeader"
import PublicHero from "./components/PublicHero"

import PublicFooter from "./components/PublicFooter"

const PublicPage = () => {
    const { isSignedIn, user, isLoaded } = useUser()

    if (!isLoaded) {
        return <div>...Loading</div>
    }

    return (
        <div className="w-full flex flex-col h-screen"
            style={{
                background: "linear-gradient(144deg, rgba(0,0,0,1) 0%, rgba(88,101,242,1) 100%)"
            }}
        >
            <PublicHeader isSignedIn={isSignedIn} />

            <PublicHero isSignedIn={isSignedIn}/>
            
            <PublicFooter />
        </div>

    )
}

export default PublicPage