import useAccount from "@/hooks/useAccount";
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";

interface IPunch {
    time: string;
}

interface IPunchContext {
    todayPunches: IPunch[];
    isLoadingPunches: boolean;
    isDoingPunch: boolean;
    refreshTodayPunches: () => Promise<void>;
    doPunch: () => Promise<void>;
}

const PunchContext = createContext({} as IPunchContext);

export const PunchProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [todayPunches, setTodayPunches] = useState<IPunch[]>([]);
    const [isLoadingPunches, setIsLoadingPunches] = useState(false);
    const [isDoingPunch, setIsDoingPunch] = useState(false);

    const { credentials } = useAccount();

    const refreshTodayPunches = useCallback(async () => {
        if (!credentials) throw new Error("No credentials available");
    }, [credentials]);

    const doPunch = useCallback(async () => {
        if (!credentials) throw new Error("No credentials available");
    }, [credentials]);

    useEffect(() => {
        if (credentials) {
            refreshTodayPunches();
        }
    }, [credentials, refreshTodayPunches]);

    return (
        <PunchContext.Provider
            value={{
                todayPunches,
                isLoadingPunches,
                isDoingPunch,
                refreshTodayPunches,
                doPunch,
            }}
        >
            {children}
        </PunchContext.Provider>
    );
};

const usePunch = () => useContext(PunchContext);

export default usePunch;
