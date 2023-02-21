import { Page } from "puppeteer";

interface ISimpleRequest {
    url: string;
    responseBody?: unknown;
    hasFailed?: boolean;
    isOk?: boolean;
}

const contentTypes = ["text/html", "application/x-www-form-urlencoded", "application/json"];

const validateResponseHeaders = (responseContentType: string) => {
    return contentTypes.some((contentType) => responseContentType.includes(contentType));
};

export const addInterceptors = (page: Page) => {
    const results: ISimpleRequest[] = [];

    page.on("requestfinished", async (request) => {
        const response = request.response();
        const responseHeaders = response.headers();

        const responseContentType = responseHeaders["content-type"] || "";

        if (!validateResponseHeaders(responseContentType)) {
            return;
        }

        let responseBody;

        if (request.redirectChain().length === 0 && responseContentType.includes("json")) {
            // body can only be access for non-redirect responses
            responseBody = await response.json();
        }

        results.push({
            url: request.url(),
            isOk: response.ok(),
            responseBody,
        });
    });

    page.on("requestfailed", (request) => {
        // handle failed request
        results.push({
            url: request.url(),
            hasFailed: true,
        });
    });

    return results;
};
