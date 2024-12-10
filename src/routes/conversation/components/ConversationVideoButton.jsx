import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import qs from "query-string";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const ConversationVideoButton = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const isVideo = searchParams?.get("video")

    const Icon = isVideo ? (
        <FontAwesomeIcon className="text-2xl" icon="fa-solid fa-video-slash" />
    ) : (
        <FontAwesomeIcon className="text-2xl" icon="fa-solid fa-video" />
    );

    const onClick = () => {
        const url = qs.stringifyUrl({
            url: location.pathname || "",
            query: {
                video: isVideo ? undefined : true,
            }
        }, { skipNull: true })

        navigate(url)
    }

    return (
        <button onClick={onClick} className="hover:opacity-75 transition mr-4">
            {Icon}
        </button>
    );
}

export default ConversationVideoButton;