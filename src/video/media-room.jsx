/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
    LiveKitRoom,
    VideoConference,
} from '@livekit/components-react';
import '@livekit/components-styles';
import { useUser } from "@clerk/clerk-react";

export const MediaRoom = ({ chatId, video, audio, handleLeave }) => {
    const { user } = useUser()
    const [token, setToken] = useState("")

    useEffect(() => {
        if (!user?.fullName) {
            return;
        }
        (async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/livekit?room=${chatId}&username=${user?.fullName || user?.emailAddresses[0].emailAddress}`)
                const data = await res.json()
                setToken(data.token)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [user?.fullName, user?.emailAddresses, chatId])

    if (token === "") {
        return (<div className="flex flex-col flex-1 justify-center items-center">
            <span className="loading loading-ring loading-lg"></span>
            <p className="text-xs ">Loading...</p>
        </div>)
    }

    return (
        <LiveKitRoom
            data-lk-theme="default"
            serverUrl={import.meta.env.VITE_LIVEKIT_URL}
            token={token}
            connect={true}
            video={video}
            audio={audio}
            style={{ height: 'calc(100vh - 48px)' }}
            onDisconnected={handleLeave}
        >
            <VideoConference />
        </LiveKitRoom>
    )
}