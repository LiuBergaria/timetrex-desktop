import { Page } from "puppeteer";

const timeSheetUrl = "http://timetrex.oowlish.com/interface/html5/#!m=TimeSheet";
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

export const extractTodayPunches = async (page: Page) => {
    await page.goto(timeSheetUrl);

    // Wait for page loads
    await page.waitForNetworkIdle();

    const index = await page.$$eval("table:first-child thead tr:last-child th", (headers) => {
        const selectedItem = headers.find((header) => header.className.includes("highlight-header"));

        return headers.indexOf(selectedItem);
    });

    console.log({ index });

    // const index = [...highlightedHeader.parentElement.children].findIndex((x) => x === highlightedHeader);
    // const table = document.querySelector("#timesheet_view_container_60_grid");
    // const lines = [...table.querySelectorAll("tr")].filter((el) =>
    //     ["In", "Out"].includes(el.querySelector("td").textContent)
    // );
    // return lines
    //     .map((el) => el.querySelector("td:nth-child(" + (index + 1) + ") span").textContent)
    //     .filter((value) => !!value);
};
