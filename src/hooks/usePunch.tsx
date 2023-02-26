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
    todayPunchesError?: string;
    punchError?: string;
}

const PunchContext = createContext({} as IPunchContext);

const RefreshIntervalMS = 15 * 60 * 1000;

export const PunchProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [todayPunches, setTodayPunches] = useState<IPunch[]>([]);
    const [todayPunchesError, setTodayPunchesError] = useState<string>();
    const [isLoadingPunches, setIsLoadingPunches] = useState(false);
    const [punchError, setPunchError] = useState<string>();
    const [isDoingPunch, setIsDoingPunch] = useState(false);

    const { credentials } = useAccount();

    const refreshTodayPunches = useCallback(async () => {
        setTodayPunchesError(undefined);
        if (!credentials) throw new Error("No credentials available");

        setIsLoadingPunches(true);

        const response = await TimeTrex.getTodayPunches(credentials);

        if (response.success) {
            setTodayPunches(response.data.map((time) => ({ time })));
        } else {
            setTodayPunchesError(response.error);
        }

        setIsLoadingPunches(false);
    }, [credentials]);

    const doPunch = useCallback(async () => {
        setPunchError(undefined);
        if (!credentials) throw new Error("No credentials available");

        setIsDoingPunch(true);

        const response = await TimeTrex.punch(credentials);

        if (response.success) {
            setTodayPunches((oldPunches) => [...oldPunches, { time: response.data }]);
        } else {
            setPunchError(response.error);
        }

        refreshTodayPunches();

        const title = response.success ? "Successfully punched" : "Error while punching";

        new Notification(title);

        setIsDoingPunch(false);
    }, [credentials, refreshTodayPunches]);

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
                todayPunchesError,
                punchError,
            }}
        >
            {children}
        </PunchContext.Provider>
    );
};

const usePunch = () => useContext(PunchContext);

export default usePunch;
