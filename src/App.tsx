import { AccountProvider } from "@/hooks/useAccount";
import { PunchProvider } from "@/hooks/usePunch";
import Routes from "@/screens/routes";

const App = () => {
    return (
        <AccountProvider>
            <PunchProvider>
                <div className="bg-neutral-800 text-white p-5">
                    <Routes />
                </div>
            </PunchProvider>
        </AccountProvider>
    );
};

export default App;
