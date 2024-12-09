/* eslint-disable react/prop-types */
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { useState } from "react";
import { deleteMessage } from '../../../../../services/message';
const ModalMessageDelete = ({ deletingMessage, setDeletingMessage }) => {
    console.log(deletingMessage)
    const [isLoading, setIsLoading] = useState(false)
    const message = deletingMessage

    if (!deletingMessage) {
        return <></>
    }
    const isUpdated = message.updatedAt && message.updatedAt !== message.createdAt
    const fileType = message.fileUrl?.split(".").pop()
    const isAdmin = message.member.role === "ADMIN"
    const isModerator = message.member.role === "MODERATOR"
    const isPDF = fileType === "pdf" && message.fileUrl
    const isImage = !isPDF && message.fileUrl

    const roleIconMap = {
        "GUEST": null,
        "MODERATOR": <FontAwesomeIcon className="ml-2 text-primary" icon="fa-solid fa-shield-halved" />,
        "ADMIN": <FontAwesomeIcon className="ml-2 text-red" icon="fa-solid fa-shield" />
    }

    const handleCancel = () => {
        const modal = document.getElementById("delete_message_modal");
        if (modal) {
            modal.close();
        }
    };

    const handleConfirm = async () => {
        try {
            setIsLoading(true)
            await deleteMessage(deletingMessage.id)
            setDeletingMessage(null)
            setIsLoading(false)
            const modal = document.getElementById("delete_message_modal");
            modal.close()
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }



    return (
        <dialog id="delete_message_modal" className="modal">
            <div className="modal-box bg-bg2 p-0 overflow-hidden">
                <div className="px-6 py-8">
                    <h3 className="font-bold text-2xl text-center text-black dark:text-white mb-4">Delete message?</h3>
                    <p className="text-center mb-4">Are you sure you want to delete <span className="font-semibold"></span>?</p>
                    <div className="shadow-md p-3 flex bg-bg1 gap-x-2">
                        <img className="w-10 h-10 rounded-full shadow border border-bg0" src={`${message.member.profile.imageUrl}`} />
                        <div className="flex flex-col w-full">
                            <div className="flex items-center gap-x-2">
                                <div className="flex items-center">
                                    <p className={`font-semibold text-sm hover:underline cursor-pointer ${isAdmin && "text-red"} ${isModerator && "text-primary"}`}>{message.member.profile.name}</p>
                                    <div className="tooltip" data-tip={message.member.role}>
                                        {roleIconMap[message.member.role]}
                                    </div>
                                </div>
                                <span className='text-xs'>{moment(message.createdAt).format('hh:mm, D MMM YYYY')}</span>
                            </div>
                            {isImage && (
                                <a
                                    href={`${import.meta.env.VITE_API_URL}/upload/open-files/${message.fileUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className='relative rounded-md mt-2 overflow-hidden border border-bg0 bg-bg2 flex items-center w-full h-auto shadow-md'
                                >
                                    <img className='object-cover fill-current' src={`${import.meta.env.VITE_API_URL}/upload/files/${message.fileUrl}`} />
                                </a>
                            )}
                            {
                                isPDF && (
                                    <div className="relative flex items-center p-3 pr-6 mt-2 rounded-md bg-bg0">
                                        <FontAwesomeIcon className=" text-4xl" icon="fa-regular fa-file-pdf" />
                                        <a href={`${import.meta.env.VITE_API_URL}/upload/open-files/${message.fileUrl}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="ml-2 text-sm text-primary hover:underline break-all"
                                        >
                                            {`${message.fileUrl}`}
                                        </a>
                                    </div>
                                )
                            }
                            {
                                !message.fileUrl  && (
                                    <p className={`text-sm text-zinc-600 dark:text-zinc-300 ${message.deleted && "italic text-zinc-500 dark:text-zinc-400 text-xs mt-1"}`}>
                                        {message.content}
                                        {
                                            isUpdated && !message.deleted && (
                                                <span className='text-xs mx-2 text-zinc-500 dark:text-zinc-400'>(edited)</span>
                                            )
                                        }
                                    </p>
                                )
                            }
                        </div>
                    </div>
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

export default ModalMessageDelete;