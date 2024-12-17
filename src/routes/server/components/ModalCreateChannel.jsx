/* eslint-disable react/prop-types */
import { useState } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addChannel } from "../../../services/server";

const ModalCreateChannel = ({server, setServer, setChannels, type, setType, userId }) => {
    const [name, setName] = useState('')

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const checkName = () => {
        if (name === '') {
            return false
        }
        if (server.channels?.length > 0) {
            for (const channel of server?.channels || []) {
                if (channel.name === name) {
                    return false
                }
            }
            return true
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const newChannel = await addChannel(server.id, name, type, userId)

            setServer((prev) => ({
                ...prev,
                channels: [...(prev.channels ||[]), newChannel]
            }))
            setChannels(prev => [...prev, newChannel])
            document.getElementById('create_channel_modal').close()
        }catch(error) {
            console.log(error)
        }
    }

    return (
        <dialog id="create_channel_modal" className="modal">
            <div className="modal-box bg-bg2 p-0 overflow-hidden">
                <div className="px-6 pt-8 pb-0">
                    <h3 className="font-bold text-2xl text-center text-black dark:text-white mb-4">Create channel</h3>
                </div>
                <form onSubmit={(e) => { handleSubmit(e) }} className="space-y-8">
                    <div className="space-y-8 px-6">
                        <div>
                            <span className="label-text text-xs font-semibold">CHANNEL TYPE</span>
                            <div className="mt-2">
                                <div onClick={() => setType("TEXT")} className={`h-20 flex items-center px-3 py-2.5 mb-2 cursor-pointer transition-colors duration-300 ${type === "text" && "bg-bg0"} hover:bg-bg0`}>
                                    <div className="flex items-center">
                                        <FontAwesomeIcon className="text-xl mr-3" icon="fa-solid fa-hashtag" />
                                        <div className="flex flex-col">
                                            <p className="text-base font-semibold">Text channel</p>
                                            <p className="text-sm">Send messages, images, gif, emojis and wordplays</p>
                                        </div>
                                    </div>
                                    <input type="radio" name="channel-type" className="radio ml-auto" checked={type === "TEXT"} readOnly/>
                                </div>

                                <div onClick={() => setType("AUDIO")} className={`h-20 flex items-center px-3 py-2.5 cursor-pointer transition-colors duration-300 ${type === "AUDIO" && "bg-bg0"} hover:bg-bg0`}>
                                    <div className="flex items-center">
                                        <FontAwesomeIcon className="text-xl mr-3" icon="fa-solid fa-microphone" />
                                        <div className="flex flex-col">
                                            <p className="text-base font-semibold">Audio channel</p>
                                            <p className="text-sm">Communicate with voice.</p>
                                        </div>
                                    </div>
                                    <input type="radio" name="channel-type" className="radio ml-auto" checked={type === "AUDIO"} readOnly/>
                                </div>

                                <div onClick={() => setType("VIDEO")} className={`h-20 flex items-center px-3 py-2.5 cursor-pointer transition-colors duration-300 ${type === "VIDEO" && "bg-bg0"} hover:bg-bg0`}>
                                    <div className="flex items-center">
                                        <FontAwesomeIcon className="text-xl mr-3" icon="fa-solid fa-video" />
                                        <div className="flex flex-col">
                                            <p className="text-base font-semibold">Video channel</p>
                                            <p className="text-sm">Video call and screen sharing.</p>
                                        </div>
                                    </div>
                                    <input type="radio" name="channel-type" className="radio ml-auto" checked={type === "VIDEO"} readOnly/>
                                </div>
                            </div>
                        </div>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-xs font-bold">CHANNEL NAME</span>
                            </div>
                            <input
                                type="text"
                                name="channelName"
                                placeholder="New channel name here"
                                required
                                value={name}
                                onChange={handleNameChange}
                                className="input input-bordered w-full bg-bg3 border-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:italic"
                            />
                            <div className="label">
                                <span className="label-text-alt italic">Channel name is required.</span>
                            </div>
                        </label>
                    </div>

                    <div className="px-6 py-4 bg-bg1 text-center">
                        <button className={`btn w-full bg-primary text-white hover:bg-primary hover:brightness-75 border-0 transition-all duration-300 ${!checkName() && 'btn-disabled'}`}>Create</button>
                    </div>
                </form>
            </div>

            <form method="dialog" className="modal-backdrop">
                <button></button>
            </form>
        </dialog >
    )
}

export default ModalCreateChannel