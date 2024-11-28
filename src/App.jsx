/* eslint-disable react/prop-types */
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(fas, fab, far);

import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

import PublicPage from "./routes/public/PublicPage";
import SetupPage from "./routes/setup/SetupPage";
import SignInPage from "./routes/sign-in/SignInPage";
import SignUpPage from "./routes/sign-up/SignUpPage";

import HomePage from "./routes/home/HomePage";


const RequireAuth = ({ children }) => {
    const { userId, isLoaded } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoaded && !userId) {
            navigate("/sign-in");
        }
    }, [isLoaded, userId, navigate])

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (!userId) {
        return null;
    }

    return children;
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<SetupPage />} />
            <Route path="/sign-in/*" element={<SignInPage />} />
            <Route path="/sign-up/*" element={<SignUpPage />} />

            <Route path='/channels/@me' element={
                <RequireAuth>
                    <HomePage />
                </RequireAuth>
            } />
        </Routes>
    );
}

export default App;
