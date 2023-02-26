import useAccount from "@/hooks/useAccount";
import Punch from "@/screens/Punch";
import SignIn from "@/screens/SignIn";

const Routes = () => {
    const { credentials, isLoadingCredentials } = useAccount();

    if (isLoadingCredentials) {
        return (
            <div className="flex flex-1 justify-center items-center">
                <h1>Loading app credentials</h1>
            </div>
        );
    }

    if (credentials) {
        return <Punch />;
    }

    return <SignIn />;
};

export default Routes;
