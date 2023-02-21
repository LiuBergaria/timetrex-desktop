import useAccount from "@hooks/useAccount";
import usePunch from "@hooks/usePunch";

const Punch: React.FC = () => {
    const { doPunch } = usePunch();
    const { deleteCredentials, credentials } = useAccount();

    return (
        <div>
            <h1>Last punch today: -</h1>
            <div className="w-full mt-5">
                <button
                    className="border rounded-lg px-4 py-2 w-full hover:bg-white hover:text-violet-900 transition"
                    onClick={doPunch}
                >
                    Do punch
                </button>
                <button
                    className="border rounded-lg px-4 py-2 w-full hover:bg-white hover:text-violet-900 transition mt-3"
                    onClick={deleteCredentials}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Punch;