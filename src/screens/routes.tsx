import useAccount from "@hooks/useAccount";
import Punch from "@screens/Punch";
import SignIn from "@screens/SignIn";

const Routes = () => {
    const { credentials } = useAccount();

    if (credentials) {
        return <Punch />;
    }

    return <SignIn />;
};

export default Routes;
