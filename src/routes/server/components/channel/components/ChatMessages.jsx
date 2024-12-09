/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useChatQuery } from "../../../../../hooks/use-chat-query";
import ChatWelcome from "./ChatWelcome";
import { Fragment } from "react";
import ChatItem from "./ChatItem";

const ChatMessages = ({ channel, chatId, server, userId, deletingMessage, setDeletingMessage }) => {
    const queryKey = `chat:${chatId}`
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useChatQuery({
        queryKey,
        channelId: channel.id
    })

    if (status === "loading") {
        return (
            <div style={{ height: "calc(100vh - 136px)" }} className="flex flex-col flex-1 justify-center items-center">
                <span className="loading loading-ring loading-lg"></span>
                <p className="text-xs mt-2">Loading messages...</p>
            </div>
        )
    }

    if (status === "error") {
        return (
            <div style={{ height: "calc(100vh - 136px)" }} className="flex flex-col flex-1 justify-center items-center">
                <FontAwesomeIcon className="text-red text-[40px]" icon="fa-regular fa-circle-xmark" />
                <p className="text-xs text-red mt-2">Something went wrong!</p>
            </div>
        )
    }

    return (
        <div style={{ height: "calc(100vh - 136px)" }} className="flex flex-col py-4 overflow-y-auto">
            <div className="flex-1" />
            <ChatWelcome channel={channel} />
            <div className="flex flex-col-reverse mt-auto">
                {
                    data?.pages?.map((group, i) => (
                        <Fragment key={i}>
                            {group.messages.map((message) => (
                                <ChatItem
                                    key={message.id}
                                    message={message}
                                    userId={userId}
                                    deletingMessage={deletingMessage}
                                    setDeletingMessage={setDeletingMessage}
                                />
                            ))}
                        </Fragment>
                    ))
                }
            </div>
        </div>
    );
}

export default ChatMessages;