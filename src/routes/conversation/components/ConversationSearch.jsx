/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import "react-cmdk/dist/cmdk.css";
import CommandPalette, { filterItems, useHandleOpenCommandPalette } from "react-cmdk";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { createConversation,findConversationWithMembers } from "../../../services/conversation";

const ConversationSearch = ({ data, userId }) => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')
    useHandleOpenCommandPalette(setOpen)

    const filteredItems = filterItems(data, search)

    const onClick = async (conversation) => {
        setOpen(false)

        const request = await findConversationWithMembers(conversation.id)

        if (request?.length > 0) {
            navigate(`/conversations/${request[0].id}`)
        } else {
            const newConvo = await createConversation(userId, conversation.id)
            navigate(`/conversations/${newConvo.id}`)
        }
    }

    return (
        <>
            <button onClick={() => { setOpen(true) }} className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full transition duration-300 hover:bg-bg0 dark:hover:text-white hover:text-black">
                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                <p className="font-semibold text-sm">Search</p>
                <kbd className="bg-bg3 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-xs font-medium ml-auto"><span className="text-xs">CTRL</span>K</kbd>
            </button>
            <CommandPalette
                onChangeSearch={setSearch}
                onChangeOpen={setOpen}
                search={search}
                isOpen={open}
            >
                {
                    filteredItems.map((d) =>
                        d.items?.length > 0 && (
                            <CommandPalette.List
                                heading={d.heading}
                                key={d.id}
                            >
                                {
                                    d.items.map((conversation) => (
                                        <CommandPalette.ListItem
                                            key={conversation.id}
                                            children={conversation.children}
                                            icon={conversation.icon}
                                            onClick={() => { onClick(conversation) }}
                                        >

                                        </CommandPalette.ListItem>
                                    ))
                                }
                            </CommandPalette.List>
                        ))
                }
            </CommandPalette>
        </>
    );
}

export default ConversationSearch;