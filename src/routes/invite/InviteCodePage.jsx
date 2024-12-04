import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "@clerk/clerk-react";

import { addMember, getServerByInviteCode } from "../../services/server"

const InviteCodePage = () => {
    const { userId, isLoaded } = useAuth()
    const [server, setServer] = useState(null)

    const inviteCode = useParams().inviteCode
    const navigate = useNavigate()

    useEffect(() => {
        const fetchServer = async () => {
            try {
                const response = await getServerByInviteCode(inviteCode)
                setServer(response)
            } catch (error) {
                console.log(error)
            }
        }
        fetchServer()
    }, [inviteCode])

    useEffect(() => {
        if (isLoaded && server) {
            const helper = server.members.find((member) => member.profile === userId)
            if (helper) {
                navigate(`/servers/${server.id}`)
            }
        }
    }, [isLoaded, navigate, server, userId])

    const onAccept = async () => {
        await addMember(server.id, 'GUEST', userId)
        navigate(`/servers/${server.id}`)
    }

    if (!server) {
        return <div>...Loading</div>
    }

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className=" w-[480px] p-8 bg-bg2 flex flex-col justify-center items-center shadow-lg rounded-lg">
                <img className=" w-16 h-16 rounded-lg bg-bg0 mb-8 shadow-lg" src={`${import.meta.env.VITE_API_URL}/upload/files/${server.imageUrl}`} alt="" />
                <p>You have been invited to</p>
                <h1 className=" text-2xl text-black dark:text-white font-semibold my-1">{server.name}</h1>
                <p>Join <span className="text-white font-semibold">{server.members.length}</span> other members today!</p>

                <button onClick={onAccept} className="btn w-full mt-8 bg-primary hover:bg-primary-hover text-white h-11 rounded shadow transition-all duration-300 text-base font-semibold">Accept invitation</button>
            </div>
        </div>
    )
}

export default InviteCodePage