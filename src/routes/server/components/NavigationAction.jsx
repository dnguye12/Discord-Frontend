import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavigationAction = () => {
    return (
        <div>
            <button onClick={() => document.getElementById('create_server_modal').showModal()} className="group flex items-center tooltip tooltip-right" data-tip="Add a server">
                <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all duration-300 overflow-hidden items-center justify-center bg-bg2 drop-shadow group-hover:bg-green text-green group-hover:text-white">
                    <FontAwesomeIcon className="text-xl" icon="fa-solid fa-plus" />
                </div>
            </button>
        </div>
    )
}

export default NavigationAction