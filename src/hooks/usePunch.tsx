import useAccount from "@/hooks/useAccount";
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useRef, useState } from "react";

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

const RefreshIntervalMS = 15 * 60 * 1000;

export const PunchProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [todayPunches, setTodayPunches] = useState<IPunch[]>([]);
    const [isLoadingPunches, setIsLoadingPunches] = useState(false);
    const [isDoingPunch, setIsDoingPunch] = useState(false);

    const { credentials } = useAccount();

    const refreshTodayPunches = useCallback(async () => {
        if (!credentials) throw new Error("No credentials available");

        setIsLoadingPunches(true);

        const response = await TimeTrex.getTodayPunches(credentials);

        if (response.success) {
            setTodayPunches(response.data.map((time) => ({ time })));
        }

        setIsLoadingPunches(false);
    }, [credentials]);

    const doPunch = useCallback(async () => {
        if (!credentials) throw new Error("No credentials available");

        setIsDoingPunch(true);

        const response = await TimeTrex.punch(credentials);

        if (response.success) {
            setTodayPunches((oldPunches) => [...oldPunches, { time: response.data }]);
        }

        const title = response.success ? "Successfully punched" : "Error while punching";

        new Notification(title);

        setIsDoingPunch(false);
    }, [credentials]);

    useEffect(() => {
        let refreshingInterval: NodeJS.Timeout;

        if (credentials) {
            refreshTodayPunches();
            refreshingInterval = setInterval(refreshTodayPunches, RefreshIntervalMS);
        }

        return () => clearInterval(refreshingInterval);
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
