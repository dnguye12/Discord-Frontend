/* eslint-disable react/prop-types */
import { useState } from "react";
import { deleteServer } from "../../../services/server";
import { useNavigate } from "react-router-dom";

const ModalDeleteServer = ({ removeServer ,server, setServer, userId }) => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const handleCancel = () => {
        const modal = document.getElementById("delete_server_modal");
        if (modal) {
            modal.close();
        }
    };

    const handleConfirm = async () => {
        try {
            setIsLoading(true)
            await deleteServer(server.id, userId)
            const modal = document.getElementById("delete_server_modal");
            modal.close()
            removeServer(server)
            setServer(null)
            navigate('/servers/')
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <dialog id="delete_server_modal" className="modal">
            <div className="modal-box bg-bg2 p-0 overflow-hidden">
                <div className="px-6 py-8">
                    <h3 className="font-bold text-2xl text-center text-black dark:text-white mb-4">Delete {server.name}</h3>
                    <p className="text-center">Are you sure you want to delete <span className="font-semibold">{server.name}</span>?<br />This server will be permanently deleted.</p>
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

export default ModalDeleteServer