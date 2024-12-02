/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { generateNewInviteCode } from "../../../services/server";

const ModalInvite = ({ server, userId }) => {
    const [inviteUrl, setInviteUrl] = useState(`${window.location.origin}/invite/${server.inviteCode}`)
    const [copied, setCopied] = useState(false)

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl)
        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 5000)
    }

    const onNewInviteCode = async () => {
        try {
            const response = await generateNewInviteCode(server.id, userId)
            setInviteUrl(`${window.location.origin}/invite/${response.inviteCode}`)
        }catch(error) {
            console.log(error)
        }
    }

    return (
        <dialog id="invite_modal" className="modal">
            <div className="modal-box bg-bg2 p-0 overflow-hidden">
                <div className="px-6 pt-8 pb-0">
                    <h3 className="font-bold text-2xl text-center text-black dark:text-white mb-4">Invite friends</h3>
                </div>

                <div className="p-6">
                    <label className="uppercase text-xs font-bold">Server invite link</label>
                    <div className="flex items-center mt-2 gap-x-2">
                        <div className="w-full border-0 h-12 ring-0 bg-bg3 rounded-md px-4 flex items-center text-black dark:text-white overflow-x-auto whitespace-nowrap" >{inviteUrl}</div>
                        {
                            copied
                                ?
                                <button className="btn bg-green hover:bg-green cursor-default duration-300 w-12 h-12 text-white"><FontAwesomeIcon icon="fa-solid fa-check" /></button>
                                :
                                <button onClick={onCopy} className="btn bg-primary hover:bg-primary-hover duration-300 w-12 h-12 text-white"><FontAwesomeIcon icon="fa-solid fa-copy" /></button>
                        }

                    </div>
                    <button onClick={onNewInviteCode} className="btn btn-ghost hover:bg-transparent hover:underline btn-sm text-sm mt-2 text-blue">Generate a new link <FontAwesomeIcon icon="fa-solid fa-rotate" /></button>
                </div>
            </div>

            <form method="dialog" className="modal-backdrop">
                <button></button>
            </form>
        </dialog >
    )
}

export default ModalInvite