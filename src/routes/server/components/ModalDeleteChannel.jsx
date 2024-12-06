/* eslint-disable react/prop-types */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteChannel } from "../../../services/channel";

const ModalDeleteChannel = ({ currentChannel, setCurrentChannel, setChannels, server, setServer, userId }) => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const handleCancel = () => {
        const modal = document.getElementById("delete_channel_modal");
        if (modal) {
            modal.close();
        }
    };

    const handleConfirm = async () => {
        try {
            setIsLoading(true)
            const res = await deleteChannel(currentChannel.id, userId)
            setChannels((prev) => prev.filter((subPrev) => subPrev.id !== currentChannel.id))
            setCurrentChannel(null)
            setServer(res)
            const modal = document.getElementById("delete_channel_modal");
            modal.close()
            navigate(`/servers/${server.id}`)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    if(!currentChannel) {
        return <></>
    }

    return (
        <dialog id="delete_channel_modal" className="modal">
            <div className="modal-box bg-bg2 p-0 overflow-hidden">
                <div className="px-6 py-8">
                    <h3 className="font-bold text-2xl text-center text-black dark:text-white mb-4">Delete {currentChannel.name}?</h3>
                    <p className="text-center">Are you sure you want to delete <span className="font-semibold">{currentChannel.name}</span>?<br />This channel will be permanently deleted.</p>
                </div>

                <div className="px-6 py-4 bg-bg1">
                    <div className="flex items-center justify-between w-full">
                        <button disabled={isLoading} onClick={handleCancel} className="btn btn-ghost">Cancel</button>
                        <button disabled={isLoading} onClick={handleConfirm} className="btn btn-error">Confirm</button>
                    </div>
                </div>
            </div>

            <form method="dialog" className="modal-backdrop">
                <button></button>
            </form>
        </dialog >
    )
}

export default ModalDeleteChannel