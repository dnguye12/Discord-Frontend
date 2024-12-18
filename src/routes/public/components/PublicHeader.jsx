/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PublicHeader = ({ isSignedIn }) => {
    return (
        <div className="bg-transparent h-20 w-full max-w-6xl p-10 mx-auto flex justify-between items-center">
            <div className="flex items-center text-white font-bold text-xl drop-shadow-md">
                <FontAwesomeIcon className="mr-1 text-3xl" icon="fa-brands fa-discord" />
                <p className="uppercase">Discord Clone</p>
            </div>
            <a className="bg-white px-4 py-2 flex justify-center items-center rounded-full text-black text-sm border-none transition font-semibold hover:scale-105 hover:bg-neutral-200" href={`${isSignedIn ? "/conversations" : "/sign-in"}`} >{isSignedIn ? "Open servers" : "Log in"}</a>
        </div>
    );
}

export default PublicHeader