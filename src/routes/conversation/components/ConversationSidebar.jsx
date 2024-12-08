/* eslint-disable react/prop-types */
import ConversationSection from "./ConversationSection";

const ConversationSidebar = ({conversations, userId, currentConversation, setCurrentConversation}) => {
    return (
        <div className="flex flex-col h-full w-full bg-bg2">
            <div className="flex-1 px-4">
                <div className="mt-2">ServerSearch</div>
                <div className="divider my-0"></div>
                <div className="mb-2">
                    <ConversationSection conversations={conversations} userId={userId} currentConversation={currentConversation} setCurrentConversation={setCurrentConversation}/>
                </div>
            </div>
        </div>
    );
}

export default ConversationSidebar;