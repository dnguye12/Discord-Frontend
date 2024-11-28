import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LeftMenu = () => {
    const [ lightMode, setLightMode ] = useState(false)

    const toggleTheme = () => {
        const currentTheme = document.body.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.body.setAttribute("data-theme", newTheme);
        setLightMode(!lightMode);
    }

    return (
        <div className="w-[72px] h-full bg-bg3 flex flex-col items-center transition-colors duration-300">
            <button className="btnThemeSwitch" onClick={toggleTheme}>
                {
                    lightMode
                        ?
                        <FontAwesomeIcon icon="fa-solid fa-moon" />
                        :
                        <FontAwesomeIcon icon="fa-solid fa-sun" />
                }
            </button>
        </div>
    )
}

export default LeftMenu