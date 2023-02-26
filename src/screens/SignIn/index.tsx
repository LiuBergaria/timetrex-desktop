import useAccount from "@/hooks/useAccount";
import { useCallback, useRef } from "react";
import { ClipLoader } from "react-spinners";

const SignIn: React.FC = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const { validateCredentials, isValidatingCredentials, credentialsError } = useAccount();

    const submitLogin = useCallback(async () => {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        if (username && password) {
            await validateCredentials({ username, password });
        }
    }, [validateCredentials]);

    return (
        <div className="flex flex-1 flex-col">
            <label className="mb-1 text-sm">Username</label>
            <input
                ref={usernameRef}
                className="border rounded-md bg-transparent px-3 py-1 text-sm disabled:opacity-50"
                disabled={isValidatingCredentials}
            />
            <label className="mt-3 mb-1 text-sm">Password</label>
            <input
                ref={passwordRef}
                className="border rounded-md bg-transparent px-3 py-1 text-sm disabled:opacity-50"
                type={"password"}
                disabled={isValidatingCredentials}
            />
            <p className="flex-1 flex items-center text-red-500 text-sm">{credentialsError}</p>
            <button
                className="border rounded-md py-2 bg-white text-neutral-900 mt-1 flex justify-center items-center disabled:opacity-75"
                onClick={submitLogin}
                disabled={isValidatingCredentials}
            >
                Login
                {isValidatingCredentials && <ClipLoader className="absolute right-9" size={20} />}
            </button>
        </div>
    );
};

export default SignIn;
