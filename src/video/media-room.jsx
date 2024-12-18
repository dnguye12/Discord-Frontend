/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
    LiveKitRoom,
    VideoConference,
} from '@livekit/components-react';
import '@livekit/components-styles';
import { useUser } from "@clerk/clerk-react";

// MediaRoom component for managing a LiveKit video conference.
export const MediaRoom = ({ chatId, video, audio, handleLeave }) => {
    const { user } = useUser() // Fetch the current user object using Clerk.
    const [token, setToken] = useState("") // State to store the LiveKit token.

    // Fetch the LiveKit token when the component mounts or when dependencies change.
    useEffect(() => {
        if (!user?.fullName) {
            return;
        }
        (async () => {
            try {
                // Fetch token from the server
                const res = await fetch(`${import.meta.env.VITE_API_URL}/livekit?room=${chatId}&username=${user?.fullName || user?.emailAddresses[0].emailAddress}`)
                const data = await res.json()
                setToken(data.token) // Update the state with the fetched token.
            } catch (error) {
                console.log(error)
            }
        })()
    }, [user?.fullName, user?.emailAddresses, chatId])

    if (token === "") {
         // Display a loading indicator if the token hasn't been fetched yet.
        return (<div className="flex flex-col flex-1 justify-center items-center">
            <span className="loading loading-ring loading-lg"></span>
            <p className="text-xs ">Loading...</p>
        </div>)
    }

    // Render the LiveKitRoom component when the token is available.
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