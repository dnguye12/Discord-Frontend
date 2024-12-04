import { useUser } from "@clerk/clerk-react";

import { getProfile, postProfile } from "../../services/profile";
import { useEffect, useState } from "react";
import { getOneServerByProfile } from "../../services/server";
import InitialModal from "./components/InitialModal";

const initialProfile = async (user) => {
    try {
        const profile = await getProfile(user.id)
        if (profile) {
            return profile
        } else {
            const name = user.fullName
            const imageUrl = user.imageUrl
            const email = user.emailAddresses[0].emailAddress

            const newProfile = await postProfile(name, imageUrl, email)
            return newProfile
        }
    } catch (error) {
        console.log(error)
        return null
    }
}

const SetupPage = () => {
    const [profile, setProfile] = useState(null)
    const [server, setServer] = useState(null)

    const user = useUser().user

    useEffect(() => {
        const fetchProfile = async () => {
            const request = await initialProfile(user)
            if (request) {
                setProfile(request.data)
            }
        }

        if (user && !profile) {
            fetchProfile()
        }
    }, [user, profile])

    
    useEffect(() => {
        const fetchServer = async () => {
            const request = await getOneServerByProfile(profile.id)
            if(request) {
                setServer(request)
            }
        }

        if(profile && !server) {
            fetchServer()
        }
    }, [profile, server])


    return (
        <InitialModal user={user}/>
    );
}

export default SetupPage;