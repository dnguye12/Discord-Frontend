import { SignOutButton } from "@clerk/clerk-react"
import LeftMenu from "./components/LeftMenu"

const HomePage = () => {
    return (
        <div className="h-screen">
            <LeftMenu />
            <h1>Home Page</h1>
            <SignOutButton />
        </div>

    )
}

export default HomePage