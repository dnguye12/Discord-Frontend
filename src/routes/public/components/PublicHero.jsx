/* eslint-disable react/prop-types */
import HeroImage from "../../../public/public-hero.webp"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const PublicHero = ({ isSignedIn }) => {
    return (
        <div className="mt-10 mb-auto">
            <div className="w-full max-w-5xl mx-auto px-10 grid grid-cols-2 items-center">
                <div className=" w-[21rem] mx-auto">
                    <h1 className="uppercase text-white font-black text-5xl mb-2">Group chat<br />that’s all<br />fun & games</h1>
                    <p className="text-lg text-neutral-50">Whitecord is great for playing games and chilling with friends, or even building a worldwide community. Customize your own space to talk, play, and hang out.</p>
                </div>
                <div
                    className="w-full min-h-[554px] bg-center bg-contain bg-no-repeat mx-auto relative drop-shadow-lg"
                    style={{
                        backgroundImage: `url(${HeroImage})`,
                    }}></div>
            </div>
            <div className=" flex justify-center items-center">
                {
                    isSignedIn ?
                        (
                            <>
                                <a href="/conversations" className="bg-neutral-900 px-6 py-4 flex justify-center items-center rounded-full text-neutral-200 text-xl shadow-md transition font-medium hover:scale-105 hover:bg-neutral-950">
                                    <FontAwesomeIcon className="mr-2" icon="fa-solid fa-comments" />
                                    Have a conversation</a>
                                <a href="/servers" className="bg-white px-6 py-4 flex justify-center items-center rounded-full text-black text-xl shadow-md transition font-medium hover:scale-105 hover:bg-neutral-200 ml-3">
                                    <FontAwesomeIcon className="mr-2" icon="fa-solid fa-users" />
                                    Talk in servers</a>
                            </>
                        )
                        :
                        (
                            <>
                                <a href="/sign-up" className="bg-neutral-900 px-8 py-4 flex justify-center items-center rounded-full text-neutral-200 text-xl shadow-md transition font-medium hover:scale-105 hover:bg-neutral-950">
                                    <FontAwesomeIcon className="mr-2" icon="fa-solid fa-user-plus" />
                                    Create an account</a>
                                <a href="/sign-in" className="bg-white px-8 py-4 flex justify-center items-center rounded-full text-black text-xl shadow-md transition font-medium hover:scale-105 hover:bg-neutral-200 ml-3">
                                    <FontAwesomeIcon className="mr-2" icon="fa-solid fa-right-to-bracket" />
                                    Log in</a>
                            </>
                        )
                }
            </div>
        </div>
    );
}

export default PublicHero;