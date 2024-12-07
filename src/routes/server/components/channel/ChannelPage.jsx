/* eslint-disable react/prop-types */
import { useEffect } from "react"
import { getChannel } from "../../../../services/channel"

const ChannelPage = ({ channel, setChannel }) => {
    useEffect(() => {
        if (!channel) {
            const fetchChannel = async () => {
                const urlParts = window.location.pathname.split('/')
                if (urlParts.length >= 5 && urlParts[3] === "channels") {
                    const channelId = urlParts[4]
                    try {
                        const request = await getChannel(channelId)
                        if (request) {
                            setChannel(request)
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
            fetchChannel()
        }
    }, [])

    if(!channel) {
        return <div>...Loading</div>
    }
    return (
        <div>{channel.name}</div>
    )
}

export default ChannelPage