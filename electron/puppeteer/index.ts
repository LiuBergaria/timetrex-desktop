import Puppeteer from "puppeteer";
import { addInterceptors } from "./interceptors";
import { extractTodayPunches, setUserPunch } from "./punch";
import { signIn } from "./signIn";

import { ICredentials } from "@common/@types/credentials";
import { IGetTodayPunches, IPunch, IValidateCredentials } from "@common/@types/TimeTrex";

const getBrowserAndPage = async () => {
    const browser = await Puppeteer.launch({
        headless: true,
        defaultViewport: { width: 1100, height: 800 },
    });
    const page = await browser.newPage();

    const history = addInterceptors(page);

    return { browser, page, history };
};

export const punch: IPunch = async (credentials: ICredentials) => {
    try {
        const { browser, page, history } = await getBrowserAndPage();

        await signIn(page, credentials);
        const punchTime = await setUserPunch(page);

        await browser.close();

        // Check history for success/failure
        const setUserPunchRequest = history.find((request) => request.url.includes("Method=setUserPunch"));

        if (setUserPunchRequest && setUserPunchRequest.isOk && setUserPunchRequest.responseBody?.api_retval) {
            return { success: true, data: punchTime };
        }

        return { success: false, error: "Unknown error" };
    } catch (error) {
        return { success: false, error: "Unknown error" };
    }
};

export const getTodayPunches: IGetTodayPunches = async (credentials: ICredentials) => {
    try {
        const { browser, page } = await getBrowserAndPage();

        await signIn(page, credentials);
        const todayPunches = await extractTodayPunches(page);

        await browser.close();

        return { success: true, data: todayPunches };
    } catch (error) {
        return { success: false, error: "Unknown error" };
    }
};

export const validateCredentials: IValidateCredentials = async (credentials: ICredentials) => {
    try {
        const { browser, page, history } = await getBrowserAndPage();

        await signIn(page, credentials);

        await browser.close();

        const authenticationRequest = history.find((request) => request.url.includes("APIAuthentication"));

        if (authenticationRequest.isOk && authenticationRequest.responseBody) {
            if (typeof authenticationRequest.responseBody === "string") {
                return { success: true };
            }

            return { success: false, error: "Wrong username and/or password" };
        }

        return { success: false, error: "Unknown error" };
    } catch (error) {
        return { success: false, error: "Unknown error" };
    }
};
