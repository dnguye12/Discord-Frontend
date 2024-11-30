/* eslint-disable react/prop-types */

const LeftMenu = ({user}) => {
    return (
        <div className="w-[72px] h-full bg-bg3 flex flex-col items-center transition-colors duration-300">
            <img src={user.imageUrl} className="w-12 h-12 rounded-full my-2" />
            
        </div>
    )
}

export default LeftMenu