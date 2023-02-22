import useAccount from "@/hooks/useAccount";
import { useCallback, useRef } from "react";
import { ClipLoader } from "react-spinners";

const SignIn: React.FC = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const { validateCredentials, isValidatingCredentials } = useAccount();

    const submitLogin = useCallback(async () => {
        await validateCredentials({ username: usernameRef.current?.value, password: passwordRef.current?.value });
    }, [validateCredentials]);

    return (
        <div className="flex flex-col">
            <label className="mb-1">Username</label>
            <input
                ref={usernameRef}
                className="border rounded-md bg-transparent px-3 py-1"
                disabled={isValidatingCredentials}
            />
            <label className="mt-3 mb-1">Password</label>
            <input
                ref={passwordRef}
                className="border rounded-md bg-transparent px-3 py-1"
                type={"password"}
                disabled={isValidatingCredentials}
            />
            <button
                className="border rounded-md py-2 bg-white text-indigo-900 mt-5 flex justify-center items-center"
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
