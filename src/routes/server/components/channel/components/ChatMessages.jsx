/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useChatQuery } from "../../../../../hooks/use-chat-query";
import ChatWelcome from "./ChatWelcome";
import { Fragment, useRef } from "react";
import ChatItem from "./ChatItem";
import { useChatSocket } from "../../../../../hooks/use-chat-socket";
import { useChatScroll } from "../../../../../hooks/use-chat-scroll";

const ChatMessages = ({ channel, chatId, server, userId, deletingMessage, setDeletingMessage }) => {
    const queryKey = `chat:${chatId}`
    const addKey = `chat:${chatId}:messages`
    const updateKey = `chat:${chatId}:messages:update`

    const chatRef = useRef(null)
    const bottomRef = useRef(null)

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useChatQuery({
        queryKey,
        channelId: channel.id
    })
    useChatSocket({ addKey, updateKey, queryKey })
    useChatScroll({
        chatRef,
        bottomRef,
        loadMore: fetchNextPage,
        shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
        count: data?.pages?.[0]?.items?.length ?? 0
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
        <div ref={chatRef} style={{ height: "calc(100vh - 136px)" }} className="flex flex-col py-4 overflow-y-auto">
            {!hasNextPage && <div className="flex-1" />}
            {!hasNextPage && <ChatWelcome channel={channel} />}
            {hasNextPage && (
                <div className="flex justify-center">
                    {
                        isFetchingNextPage ? (
                            <span className="loading loading-ring loading-lg"></span>
                        )
                            :
                            (
                                <div className="divider">
                                <button
                                    className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 text-xs my-4 transition"
                                    onClick={() => fetchNextPage()}
                                >Load previous messages</button>
                                </div>
                            )
                    }
                </div>
            )}
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
            <div ref={bottomRef} />
        </div>
    );
}

export default ChatMessages;