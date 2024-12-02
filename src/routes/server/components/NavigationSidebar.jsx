/* eslint-disable react/prop-types */
import { UserButton } from "@clerk/clerk-react"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavigationAction from "./NavigationAction"
import NavigationItem from "./NavigationItem"

const NavigationSidebar = ({servers}) => {
    const [ lightMode, setLightMode ] = useState(false)

    const toggleTheme = () => {
        const currentTheme = document.body.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.body.setAttribute("data-theme", newTheme);
        setLightMode(!lightMode);
    }

    return (
        <div className="space-y-4 flex flex-col items-center h-full w-full py-3 bg-bg3">
            <NavigationAction />
            <div className="divider mx-auto w-10 rounded-md"></div>
            <div className="flex-1 w-full">
                {servers &&
                    servers.map((server) => {
                        return (
                            <div key={server.id}>
                                <NavigationItem id={server.id} imageUrl={server.imageUrl} name={server.name} />
                            </div>
                        )
                    })
                }
            </div>
            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                <button className="btnThemeSwitch" onClick={toggleTheme}>
                    {
                        lightMode
                            ?
                            <FontAwesomeIcon icon="fa-solid fa-moon" />
                            :
                            <FontAwesomeIcon icon="fa-solid fa-sun" />
                    }
                </button>
                <UserButton appearance={{
                    elements: {
                        avatarBox: "h-[48px] w-[48px] shadow"
                    }
                }}/>
            </div>
        </div>
    )
}

export default NavigationSidebar