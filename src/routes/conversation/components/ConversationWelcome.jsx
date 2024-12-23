/* eslint-disable react/prop-types */
const ConversationWelcome = ({ otherProfile }) => {
    if (!otherProfile) {
        return <div>...Loading</div>
    }
    return (
        <div className="space-y-2 px-4">
            <div className="h-[72px] w-[72px] bg-bg0 rounded-full flex items-center justify-center">
                {
                    otherProfile.imageUrl
                    ? <img src={otherProfile.imageUrl} className="rounded-full w-full h-full shadow-lg" />
                    : <div className="rounded-full w-full h-full shadow-lg"></div>
                }
                
            </div>
            <p className="text-xl md:text-3xl font-bold text-black dark:text-white tracking-wide">{otherProfile.name || otherProfile.email}</p>
            <p className="text-sm">This is the start of your conversation with {otherProfile.name || otherProfile.email}.</p>
        </div>
    );
}

export default ConversationWelcome;