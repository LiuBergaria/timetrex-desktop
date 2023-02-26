import { ClipLoader } from "react-spinners";

import useAccount from "@/hooks/useAccount";
import usePunch from "@/hooks/usePunch";

const Punch: React.FC = () => {
    const { todayPunches, doPunch, isDoingPunch, isLoadingPunches } = usePunch();
    const { deleteCredentials } = useAccount();

    return (
        <div className="flex flex-col">
            <h1 className="flex items-center">
                Today punches: {isLoadingPunches && <ClipLoader className="ml-5" size={18} color={"white"} />}
            </h1>
            <p className="mt-3">
                {todayPunches.length === 0 && (isLoadingPunches ? "Loading..." : "None")}
                {todayPunches.map((punch) => punch.time).join(" ")}
            </p>
            <button
                className="border rounded-md py-2 bg-white text-neutral-900 mt-5 flex justify-center items-center disabled:opacity-75"
                onClick={doPunch}
                disabled={isDoingPunch}
            >
                Do punch
                {isDoingPunch && <ClipLoader className="absolute right-9" size={20} color={"white"} />}
            </button>
            <button
                className="border rounded-md py-2 bg-white text-neutral-900 mt-3 flex justify-center items-center disabled:opacity-75"
                onClick={deleteCredentials}
            >
                Logout
            </button>
        </div>
    );
};

export default Punch;
