/* eslint-disable react/prop-types */
import ConversationSearch from "./ConversationSearch";
import ConversationSection from "./ConversationSection";

const ConversationSidebar = ({conversations, userId, currentConversation, setCurrentConversation}) => {
    
    const getOtherProfile = (conversation) => {
        const profileOne = conversation.profileOne;
        const profileTwo = conversation.profileTwo;

        if(profileOne.id === userId) {
            return profileTwo
        }else {
            return profileOne;
        }
    }
    
    return (
        <div className="flex flex-col h-full w-full bg-bg2">
            <div className="flex-1 px-4">
                <div className="mt-2">
                    {
                        conversations?.length > 0 && 
                        <ConversationSearch data={[{
                            heading: "Other people",
                            id: "Other people",
                            items: conversations?.map((c) => ({
                                id: getOtherProfile(c).id,
                                children: getOtherProfile(c).name || getOtherProfile(c).email,
                                icon: "UserIcon"
                            }))
                        }]}/>
                    }
                </div>
                <div className="divider my-0"></div>
                <div className="mb-2">
                    <ConversationSection conversations={conversations} userId={userId} currentConversation={currentConversation} setCurrentConversation={setCurrentConversation}/>
                </div>
            </div>
        </div>
    );
}

export default ConversationSidebar;