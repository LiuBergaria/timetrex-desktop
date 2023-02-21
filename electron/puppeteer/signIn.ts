import { Page } from "puppeteer";

const signUrl = "http://timetrex.oowlish.com/interface/html5/";
const usernameInputSelector = "input[name=username]";
const passwordInputSelector = "input[name=password]";
const submitButtonSelector = "button[type=submit]";

export const signIn = async (page: Page, credentials: ICredentials): Promise<void> => {
    await page.goto(signUrl);

    // Wait for page loads
    await page.waitForNetworkIdle();

    // Wait for input shows
    await page.waitForSelector(usernameInputSelector);

    // Fill username and password
    await page.type(usernameInputSelector, credentials.username);
    await page.type(passwordInputSelector, credentials.password);

    // Do login
    await page.click(submitButtonSelector);

    // Wait for page loads
    await page.waitForNetworkIdle();
};
