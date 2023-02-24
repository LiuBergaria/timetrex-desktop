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

        const title = response.success ? "Successfully punched" : "Error while punching";

        new Notification(title);

        setIsDoingPunch(false);
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
