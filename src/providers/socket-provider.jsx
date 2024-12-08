/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { io as ClientIO } from "socket.io-client"

const SocketContext = createContext({
    socket: null,
    isConnected: false
})

export const useSocket = () => {
    return useContext(SocketContext)
}

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {
        const socketInstance = new ClientIO(import.meta.env.VITE_URL, {
            path: "/api/socket/io"
        })

        socketInstance.on("connect", () => {
            console.log("connect")
            setIsConnected(true)
        })

        socketInstance.on("disconnect", () => {
            console.log("disconnect")
            setIsConnected(false)
        })

        setSocket(socketInstance)

        return () => {
            socketInstance.disconnect()
        }
    }, [])

    return (
        <SocketContext.Provider value={{socket, isConnected}}>
            {children}
        </SocketContext.Provider>
    )
}