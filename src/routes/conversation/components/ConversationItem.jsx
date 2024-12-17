/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { updateDirectContent } from "../../../services/direct-message";

const ConversationItem = ({ dm, userId, setDeletingMessage }) => {

    const isUpdated = dm.updatedAt && dm.updatedAt !== dm.createdAt
    const fileType = dm.fileUrl?.split(".").pop()
    const isOwner = dm.profile.id === userId
    const canDeletedm = !dm.deleted && isOwner
    const canEditdm = !dm.deleted && isOwner && !dm.fileUrl
    const isPDF = fileType === "pdf" && dm.fileUrl
    const isImage = !isPDF && dm.fileUrl

    const [isLoading, setIsLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editContent, setEditContent] = useState('')

    const handleSubmitEdit = async (e, oldContent) => {
        e.preventDefault()
        if (oldContent !== editContent) {
            setIsLoading(true)

            await updateDirectContent(dm.id, editContent, dm.conversation.id)
            setEditContent('')
            setIsEditing(false)
            setIsLoading(false)
        }
    }

    const handleChangeEdit = (e) => {
        setEditContent(e.target.value)
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape" || e.keyCode === 27) {
                setIsEditing(false)
                setEditContent('')
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    return (
        <div className="relative group flex items-center p-4 transition w-full hover:bg-bg2">
            <div className="group flex gap-x-2 items-start w-full">
                <div className="cursor-pointer hover:drop-shadow-sm transition">
                    {
                        dm.profile.imageUrl ?
                            <img src={dm.profile.imageUrl} className="w-10 h-10 rounded-full shadow border border-bg0" />
                            :
                            <div className='w-10 h-10 rounded-full shadow border border-bg0'></div>
                    }
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex items-center gap-x-2">
                        <div className="flex items-center">
                            <p className={`font-semibold text-sm hover:underline cursor-pointer`}>{dm.profile.name || dm.profile.email}</p>
                        </div>
                        <span className='text-xs'>{moment(dm.createdAt).format('hh:mm, D MMM YYYY')}</span>
                    </div>
                    {isImage && (
                        <a
                            href={`${import.meta.env.VITE_API_URL}/upload/open-files/${dm.fileUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className='relative aspect-square rounded-md mt-2 overflow-hidden border border-bg0 bg-bg2 flex items-center h-48 w-48 shadow-md'
                        >
                            <img className='object-cover fill-current' src={`${import.meta.env.VITE_API_URL}/upload/files/${dm.fileUrl}`} />
                        </a>
                    )}
                    {
                        isPDF && (
                            <div className="relative flex items-center p-3 pr-6 mt-2 rounded-md bg-bg0">
                                <FontAwesomeIcon className=" text-4xl" icon="fa-regular fa-file-pdf" />
                                <a href={`${import.meta.env.VITE_API_URL}/upload/open-files/${dm.fileUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-2 text-sm text-primary hover:underline break-all"
                                >
                                    {`${dm.fileUrl}`}
                                </a>
                            </div>
                        )
                    }
                    {
                        !dm.fileUrl && !isEditing && (
                            <p className={`text-sm text-zinc-600 dark:text-zinc-300 ${dm.deleted && "italic text-zinc-500 dark:text-zinc-400 text-xs mt-1"}`}>
                                {dm.content}
                                {
                                    isUpdated && !dm.deleted && (
                                        <span className='text-xs mx-2 text-zinc-500 dark:text-zinc-400'>(edited)</span>
                                    )
                                }
                            </p>
                        )
                    }
                    {
                        !dm.fileUrl && isEditing && (
                            <>
                                <form className='flex items-center w-full gap-x-2 pt-2' onSubmit={(e) => handleSubmitEdit(e, dm.content)}>
                                    <div className='relative w-full'>
                                        <input type="text" disabled={isLoading} placeholder="Edited dm" value={editContent} onChange={handleChangeEdit} className="input w-full p-2 bg-bg3 text-sm" />
                                    </div>
                                    <button type="submit" className={`btn btn-primary dark:text-white shadow-md ${isLoading && "btn-disabled"}`}>Save</button>
                                </form>
                                <span className='text-xs mt-1 text-zinc-400'>Press <span className='text-blue'>escape</span> to cancel, <span className='text-blue'>enter</span> to save</span>
                            </>
                        )
                    }
                </div>
            </div>
            {
                canDeletedm && (
                    <div className='hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-bg3 border border-bg0 rounded shadow-md'>
                        {canEditdm && (
                            <div onClick={() => {
                                setEditContent(dm.content)
                                setIsEditing(true)
                            }
                            } className='tooltip' data-tip="Edit">
                                <FontAwesomeIcon className='w-6 text-base  cursor-pointer ml-auto hover:text-black dark:hover:text-white transition' icon="fa-solid fa-pen" />
                            </div>
                        )}
                        {canDeletedm && (
                            <div className='tooltip' onClick={async () => {
                                await setDeletingMessage(dm)
                                document.getElementById('delete_direct_message_modal').showModal()
                            }
                            } data-tip="Delete">
                                <FontAwesomeIcon className='w-6 text-base cursor-pointer ml-auto hover:text-black dark:hover:text-white transition' icon="fa-solid fa-trash-can" />
                            </div>
                        )}
                    </div>
                )
            }
        </div>
    )
}

export default ConversationItem;