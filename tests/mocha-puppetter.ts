import * as puppeteer from "puppeteer";
import * as mocha from "mocha";

export interface Suite extends mocha.Suite {
    page: puppeteer.Page;
    browser: puppeteer.Browser;
}

export function describe(title: string, fn: (this: Suite) => void): mocha.Suite {
    return mocha.describe(title, function (this: Suite) {
        before(async () => {
            this.browser = await puppeteer.launch({
                slowMo: 10,
                args: [`--window-size=1366,768`],
                headless: process.env.OPEN !== "1",
            });
            this.page = (await this.browser.pages())[ 0 ] || await this.browser.newPage();
            await this.page.setViewport({ height: 768, width: 1366 });
            await this.page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
        });
        after(async () => {
            await this.browser.close();
        });
        fn.call(this);
    } as any)
}
