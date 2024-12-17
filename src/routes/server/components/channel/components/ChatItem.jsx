/* eslint-disable react/prop-types */
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { updateContent } from '../../../../../services/message';
import { createConversation, findConversationWithMembers } from '../../../../../services/conversation';

const ChatItem = ({ message, userId, setDeletingMessage }) => {
    const navigate = useNavigate()

    const isUpdated = message.updatedAt && message.updatedAt !== message.createdAt
    const fileType = message.fileUrl?.split(".").pop()
    const isAdmin = message.member?.role === "ADMIN"
    const isModerator = message.member?.role === "MODERATOR"
    const isOwner = message.member?.profile.id === userId
    const canDeleteMessage = !message.deleted && (isAdmin || isModerator || isOwner)
    const canEditMessage = !message.deleted && isOwner && !message.fileUrl
    const isPDF = fileType === "pdf" && message.fileUrl
    const isImage = !isPDF && message.fileUrl

    const [isLoading, setIsLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editContent, setEditContent] = useState('')

    const roleIconMap = {
        "GUEST": null,
        "MODERATOR": <FontAwesomeIcon className="ml-2 text-primary" icon="fa-solid fa-shield-halved" />,
        "ADMIN": <FontAwesomeIcon className="ml-2 text-red" icon="fa-solid fa-shield" />
    }

    const handleSubmitEdit = async (e, oldContent) => {
        e.preventDefault()
        if (oldContent !== editContent) {
            setIsLoading(true)

            await updateContent(message.id, editContent, message.channel.id)
            setEditContent('')
            setIsEditing(false)
            setIsLoading(false)
        }
    }

    const handleChangeEdit = (e) => {
        setEditContent(e.target.value)
    }

    const onMemberClick = async () => {
        if (userId === message.member.profile.id) {
            return;
        }
        const request = await findConversationWithMembers(message.member.profile.id)
        if (request?.length > 0) {
            navigate(`/conversations/${request[0].id}`)
        } else {
            const newConvo = await createConversation(userId, message.member.profile.id)
            navigate(`/conversations/${newConvo.id}`)
        }
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

    if(!message || !message.member ||!message.member.profile || !message.member.role) {
        return <></>
    }

    return (
        <div className="relative group flex items-center p-4 transition w-full hover:bg-bg2">
            <div className="group flex gap-x-2 items-start w-full">
                <div onClick={onMemberClick} className="cursor-pointer hover:drop-shadow-sm transition">

                    {
                        message.member.profile.imageUrl ?
                            <img src={message.member.profile.imageUrl} className="w-10 h-10 rounded-full shadow border border-bg0" />
                            :
                            <div className="w-10 h-10 rounded-full shadow border border-bg0"></div>
                    }
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex items-center gap-x-2">
                        <div className="flex items-center">
                            <p onClick={onMemberClick} className={`font-semibold text-sm hover:underline cursor-pointer ${isAdmin && "text-red"} ${isModerator && "text-primary"}`}>{
                                message.member.profile.name || message.member.profile.email}</p>
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
                            className='relative aspect-square rounded-md mt-2 overflow-hidden border border-bg0 bg-bg2 flex items-center h-48 w-48 shadow-md'
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
                        !message.fileUrl && !isEditing && (
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
                    {
                        !message.fileUrl && isEditing && (
                            <>
                                <form className='flex items-center w-full gap-x-2 pt-2' onSubmit={(e) => handleSubmitEdit(e, message.content)}>
                                    <div className='relative w-full'>
                                        <input type="text" disabled={isLoading} placeholder="Edited message" value={editContent} onChange={handleChangeEdit} className="input w-full p-2 bg-bg3 text-sm" />
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
                canDeleteMessage && (
                    <div className='hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-bg3 border border-bg0 rounded shadow-md'>
                        {canEditMessage && (
                            <div onClick={() => {
                                setEditContent(message.content)
                                setIsEditing(true)
                            }
                            } className='tooltip' data-tip="Edit">
                                <FontAwesomeIcon className='w-6 text-base  cursor-pointer ml-auto hover:text-black dark:hover:text-white transition' icon="fa-solid fa-pen" />
                            </div>
                        )}
                        {canDeleteMessage && (
                            <div className='tooltip' onClick={async () => {
                                await setDeletingMessage(message)
                                document.getElementById('delete_message_modal').showModal()
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

export default ChatItem