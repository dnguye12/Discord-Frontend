/* eslint-disable react/prop-types */
import ConversationMember from "./ConversationMember";

const ConversationSection = ({ conversations, userId, currentConversation, setCurrentConversation }) => {

    return (
        <div className="flex flex-col items-start justify-between py-2">
            <p className="text-xs uppercase font-semibold mb-2">Direct messages</p>
            <div className="space-y-0.5 w-full">
                {
                    conversations?.map((c) => {
                        const helper = userId === c.profileOne.id
                        return (
                            <ConversationMember 
                            key={c.id} 
                            c={c} 
                            helper={helper}
                            currentConversation={currentConversation}
                            setCurrentConversation={setCurrentConversation}
                            userId={userId}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default ConversationSection;