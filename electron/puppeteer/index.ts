import Puppeteer from "puppeteer";
import { addInterceptors } from "./interceptors";
import { extractTodayPunches, setUserPunch } from "./punch";
import { signIn } from "./signIn";

import { ICredentials } from "@common/@types/credentials";

const getBrowserAndPage = async () => {
    const browser = await Puppeteer.launch({
        headless: false,
        defaultViewport: { width: 1100, height: 800 },
    });
    const page = await browser.newPage();

    const history = addInterceptors(page);

    return { browser, page, history };
};

export const punch = async (credentials: ICredentials) => {
    const { browser, page, history } = await getBrowserAndPage();

    await signIn(page, credentials);
    await setUserPunch(page);

    await browser.close();

    // Check history for success/failure
    const setUserPunchRequest = history.find((request) => request.url.includes("Method=setUserPunch"));

    if (setUserPunchRequest && setUserPunchRequest.isOk && setUserPunchRequest.responseBody?.api_retval) {
        return { success: true };
    }

    return { success: false };
};

export const getTodayPunches = async (credentials: ICredentials) => {
    const { browser, page } = await getBrowserAndPage();

    await signIn(page, credentials);
    const todayPunches = await extractTodayPunches(page);

    await browser.close();

    return { success: true, data: todayPunches };
};
