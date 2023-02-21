import { Page } from "puppeteer";

const inOutButtonSelector = "span.topbar-icon.topbar-inout";
const saveButtonSelector = "#context-button-save";

export const setUserPunch = async (page: Page) => {
    // Await for and click on IN/OUT
    await page.waitForSelector(inOutButtonSelector);
    await page.click(inOutButtonSelector);

    // Wait for page loads
    await page.waitForNetworkIdle();

    // Await for and click on SAVE
    await page.waitForSelector(saveButtonSelector);
    await page.click(saveButtonSelector);

    // Wait for page loads
    await page.waitForNetworkIdle();
};
