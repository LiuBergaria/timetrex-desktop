import { Page } from "puppeteer";

const timeSheetUrl = "http://timetrex.oowlish.com/interface/html5/#!m=TimeSheet";
const inOutButtonSelector = "span.topbar-icon.topbar-inout";
const saveButtonSelector = "#context-button-save";
const punchTimeSelector = ".t-time-picker-div input";

export const setUserPunch = async (page: Page) => {
    // Await for and click on IN/OUT
    await page.waitForSelector(inOutButtonSelector);
    await page.click(inOutButtonSelector);

    // Wait for page loads
    await page.waitForNetworkIdle();

    await page.waitForSelector(punchTimeSelector);
    const punchTime = await page.$eval(punchTimeSelector, (punchTimeInput) => punchTimeInput.value);

    // Await for and click on SAVE
    await page.waitForSelector(saveButtonSelector);
    await page.click(saveButtonSelector);

    // Wait for page loads
    await page.waitForNetworkIdle();

    return punchTime;
};

const todayHighlightedHeaderSelector = ".timesheet-punch-grid-wrapper table:first-child thead tr:last-child th";
const todayLinesSelector = ".timesheet-punch-grid-wrapper table:nth-child(2) tbody tr";

export const extractTodayPunches = async (page: Page) => {
    await page.goto(timeSheetUrl);

    // Wait for page loads
    await page.waitForNetworkIdle();

    await page.waitForSelector(todayHighlightedHeaderSelector);

    const index = await page.$$eval(todayHighlightedHeaderSelector, (headers) => {
        const selectedItem = headers.find((header) => header.className.includes("highlight-header"));

        return headers.indexOf(selectedItem);
    });

    await page.waitForSelector(todayLinesSelector);

    return await page.$$eval(
        todayLinesSelector,
        (lines, column) => {
            const validLines = lines.filter((line) => line.id === Number(line.id).toString());

            return validLines
                .map((line) => line.children[column].querySelector("span.punch-time")?.textContent)
                .filter((time) => !!time);
        },
        index
    );
};
