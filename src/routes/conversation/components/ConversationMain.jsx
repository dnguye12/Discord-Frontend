/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";

import ConversationHeader from "./ConversationHeader"
import NavigationSidebar from "../../server/components/NavigationSidebar"
import ConversationSidebar from "./ConversationSidebar"
import ConversationChatInput from "./ConversationChatInput"
import ConversationMessages from "./ConversationMessages"
import { MediaRoom } from "../../../video/media-room";

const ConversationMain = ({ conversations, currentConversation, setCurrentConversation, servers, userId, setDeletingMessage }) => {
    const [searchParams] = useSearchParams();
    const isVideo = searchParams?.get("video")
    const navigate = useNavigate()

    const [openSide, setOpenSide] = useState(false)
    const [otherProfile, setOtherProfile] = useState(null)

    useEffect(() => {
        if (currentConversation.profileOne.id === userId) {
            setOtherProfile(currentConversation.profileTwo)
        } else {
            setOtherProfile(currentConversation.profileOne)
        }
    }, [userId, currentConversation])

    return (
        <div className="bg-bg1 flex flex-col drawer">
            <input id="mobile-drawer-convo" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <ConversationHeader otherProfile={otherProfile} setOpenSide={setOpenSide} />

                {
                    isVideo
                        ? (
                            <MediaRoom
                                chatId={currentConversation.id}
                                audio={true}
                                video={true}
                                handleLeave={() => navigate(`/conversations/${currentConversation.id}`)}
                            />
                        )
                        :
                        (
                            <>
                                <ConversationMessages
                                    currentConversation={currentConversation}
                                    otherProfile={otherProfile}
                                    userId={userId}
                                    setDeletingMessage={setDeletingMessage}
                                />
                                <ConversationChatInput
                                    currentConversation={currentConversation}
                                    otherProfile={otherProfile}
                                    userId={userId}
                                />
                            </>
                        )
                }

            </div>
            <div className="md:hidden drawer-side">
                <label htmlFor="mobile-drawer-convo" aria-label="close sidebar" className="drawer-overlay" onClick={() => setOpenSide(false)}></label>
                <div className={`md:hidden flex ${openSide && "h-full w-[72px] z-30 flex-col fixed inset-y-0"} `}>
                    <NavigationSidebar servers={servers} />
                </div>
                <div className={`md:hidden flex ${openSide && "ml-[72px] fixed h-full w-60 z-20 flex-col inset-y-0 shadow"} `}>
                    <ConversationSidebar conversations={conversations} userId={userId} currentConversation={currentConversation} setCurrentConversation={setCurrentConversation} />
                </div>
            </div>
        </div>
    )
}

export default ConversationMain