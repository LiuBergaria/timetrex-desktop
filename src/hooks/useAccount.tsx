import { createContext, useCallback, useContext, useEffect, useState } from "react";

import { ICredentials } from "@common/@types/credentials";

interface IAccountContext {
    validateCredentials(credentials: ICredentials): Promise<void>;
    deleteCredentials: () => Promise<void>;
    isValidatingCredentials: boolean;
    isLoadingCredentials: boolean;
    credentials: ICredentials | undefined;
}

const AccountContext = createContext({} as IAccountContext);

export const AccountProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [credentials, setCredentials] = useState<ICredentials>();
    const [isValidatingCredentials, setIsValidatingCredentials] = useState(false);
    const [isLoadingCredentials, setIsLoadingCredentials] = useState(false);

    const validateCredentials = useCallback(async ({ username, password }: ICredentials) => {
        setIsValidatingCredentials(true);

        await NativeStorage.set<ICredentials>("UserInformation", { username, password });
        setCredentials({ username, password });

        setIsValidatingCredentials(false);
    }, []);

    const deleteCredentials = useCallback(async () => {
        setIsLoadingCredentials(true);

        await NativeStorage.delete("UserInformation");
        setCredentials(undefined);

        setIsLoadingCredentials(false);
    }, []);

    const loadCredentialsFromStorage = useCallback(async () => {
        setIsLoadingCredentials(true);

        const storedCredentials = await NativeStorage.get<ICredentials>("UserInformation");

        if (storedCredentials) setCredentials(storedCredentials);

        setIsLoadingCredentials(false);
    }, []);

    useEffect(() => {
        loadCredentialsFromStorage();
    }, [loadCredentialsFromStorage]);

    return (
        <AccountContext.Provider
            value={{
                validateCredentials,
                deleteCredentials,
                isValidatingCredentials,
                isLoadingCredentials,
                credentials,
            }}
        >
            {children}
        </AccountContext.Provider>
    );
};

const useAccount = () => useContext(AccountContext);

export default useAccount;
