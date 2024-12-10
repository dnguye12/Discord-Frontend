import { useQueryClient } from "@tanstack/react-query"
import { useSocket } from "../providers/socket-provider"
import { useEffect } from "react"

export const useChatSocket = ({ addKey, updateKey, queryKey }) => {
    const { socket } = useSocket()
    const queryClient = useQueryClient()

    useEffect(() => {
        if(!socket) {
            return;
        }

        socket.on(updateKey, (message) => {
            queryClient.setQueryData([queryKey], (oldData) => {
                if(!oldData || !oldData.pages || oldData.pages.length === 0) {
                    return oldData
                }

                const newData = oldData.pages.map((page) => {
                    return {
                        ...page,
                        items: page.item.map((item) => {
                            if(item.id === message.id) {
                                return message
                            }
                            return item
                        })
                    }
                })

                return {
                    ...oldData,
                    pages: newData
                }
            })
        })

        socket.on(addKey, (message) => {
            queryClient.setQueryData([queryKey], (oldData) => {
                if(!oldData || !oldData.pages || oldData.pages.length === 0) {
                    return {
                        pages: [{
                            items: [message]
                        }]
                    }
                }

                const newData = [...oldData.pages]

                newData[0] = {
                    ...newData[0],
                    items: [
                        message,
                        ...newData[0].items,
                    ]
                }

                return {
                    ...oldData,
                    pages: newData
                }
            })
        })

        return () => {
            socket.off(addKey)
            socket.off(updateKey)
        }
    }, [addKey, queryKey, queryClient, socket, updateKey])
}