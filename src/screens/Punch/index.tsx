import { ClipLoader } from "react-spinners";

import useAccount from "@/hooks/useAccount";
import usePunch from "@/hooks/usePunch";

const Punch: React.FC = () => {
    const { todayPunches, doPunch, isDoingPunch, isLoadingPunches } = usePunch();
    const { deleteCredentials } = useAccount();

    return (
        <div>
            <h1 className="flex items-center">
                Today punches: {isLoadingPunches && <ClipLoader className="ml-5" size={18} color={"white"} />}
            </h1>
            <p className="mt-3">
                {todayPunches.length === 0 && (isLoadingPunches ? "Loading..." : "None")}
                {todayPunches.map((punch) => punch.time).join(" ")}
            </p>
            <div className="w-full mt-5">
                <button
                    className="border rounded-lg px-4 py-2 w-full hover:bg-white hover:text-violet-900 transition  flex justify-center items-center"
                    onClick={doPunch}
                    disabled={isDoingPunch}
                >
                    Do punch
                    {isDoingPunch && <ClipLoader className="absolute right-9" size={20} color={"white"} />}
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
