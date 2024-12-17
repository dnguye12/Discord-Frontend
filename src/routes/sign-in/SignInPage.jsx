import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
    return (
        <div className="h-screen w-full flex justify-center items-center">
            <SignIn path="/sign-in" />
        </div>

    );
}

export default SignInPage;