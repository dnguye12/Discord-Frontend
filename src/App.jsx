/* eslint-disable react/prop-types */
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(fas, fab, far);

import { useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import PublicPage from "./routes/public/PublicPage";
import SignInPage from "./routes/sign-in/SignInPage";
import SignUpPage from "./routes/sign-up/SignUpPage";
import HomePage from "./routes/home/HomePage";
import ServerPage from "./routes/server/ServerPage";
import InviteCodePage from "./routes/invite/InviteCodePage";
import ConversationPage from "./routes/conversation/ConversationPage";


import { getProfile, postProfile, setProfileStatus } from "./services/profile";
import ServerStats from "./server-stats/ServerStats";


const RequireAuth = ({ children }) => {
    const { isSignedIn, user, isLoaded } = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            navigate("/sign-in"); // Redirects to sign-in if the user is not signed in.
        }
    }, [isLoaded, isSignedIn, navigate])

    useEffect(() => {
        if (user) {
            const checkProfile = async () => {
                try {
                    // Checks if the user profile exists and creates one if not.
                    const request = await getProfile(user.id)
                    if (request?.status === 204) {
                        const helperImage = user.hasImage ? user.imageUrl : ""
                        const helperEmail = user.emailAddresses.length > 0 ? user.emailAddresses[0].emailAddress : ""
                        await postProfile(user.id, user.fullName, helperImage, helperEmail)
                    }
                     // Sets the user's profile status as "online".
                    await setProfileStatus(user.id, 'ONL', Date.now())
                } catch (error) {
                    console.log(error)
                }
            }
            checkProfile()
        }
    }, [user])

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return null;
    }

    return children;
}

function App() {
    //Server routers
    return (
        <Routes>
            <Route path="/" element={<PublicPage />} />
            <Route path="/sign-in/*" element={<SignInPage />} />
            <Route path="/sign-up/*" element={<SignUpPage />} />

            <Route path='/servers/:serverId/stats' element={
                <RequireAuth>
                    <ServerStats />
                </RequireAuth>
            } />
            <Route path='/servers/:serverId/*' element={
                <RequireAuth>
                    <ServerPage />
                </RequireAuth>
            } />
            <Route path='/servers' element={
                <RequireAuth>
                    <ServerPage />
                </RequireAuth>
            } />
            <Route
                path="/invite"
                element={<Navigate to="/" replace />}
            />
            <Route
                path="/invite/"
                element={<Navigate to="/" replace />}
            />
            <Route path='/invite/:inviteCode' element={
                <RequireAuth>
                    <InviteCodePage />
                </RequireAuth>
            } />
            <Route path='/conversations/*' element = {
                <RequireAuth>
                    <ConversationPage />
                </RequireAuth>
            } />
        </Routes>
    );
}

export default App;
