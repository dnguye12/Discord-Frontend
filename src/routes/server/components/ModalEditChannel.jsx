/* eslint-disable react/prop-types */
import { useState } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addChannel } from "../../../services/server";
import { editChannelName } from "../../../services/channel";

const ModalEditChannel = ({ currentChannel, setCurrentChannel, server, setChannels, userId }) => {
    const [name, setName] = useState(currentChannel.name)

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const checkName = () => {
        if (name === '') {
            return false
        }
        if(name === currentChannel.name) {
            return false
        }
        if (server.channels?.length > 0) {
            for (const channel in server?.channels) {
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
            const req = await editChannelName(currentChannel.id, name, userId)
            setName("")
            setChannels((prev) => prev.map((c) => c.id === req.id ? req : c))
            setCurrentChannel(null)

            document.getElementById('create_channel_modal').close()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <dialog id="edit_channel_modal" className="modal">
            <div className="modal-box bg-bg2 p-0 overflow-hidden">
                <div className="px-6 pt-8 pb-0">
                    <h3 className="font-bold text-2xl text-center text-black dark:text-white mb-4">Edit Channel</h3>
                </div>
                <form onSubmit={(e) => { handleSubmit(e) }} className="space-y-8">
                    <div className="space-y-8 px-6">

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

export default ModalEditChannel