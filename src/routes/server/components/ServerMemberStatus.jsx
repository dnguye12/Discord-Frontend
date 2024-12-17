/* eslint-disable react/prop-types */
const ServerMemberStatus = ({ status }) => {
    return (
        status === 'ONL'
        ? (
            <div className="absolute bottom-0 right-0 bg-green w-3 h-3 border border-bg2 rounded-full"></div>
        )
        : 
        status === 'OFF'
        ?(
            <div className="absolute bottom-0 right-0 bg-bg0 w-3 h-3 border border-bg2 rounded-full"></div>
        )
        :
        (
            <div></div>
        )
    );
}

export default ServerMemberStatus;