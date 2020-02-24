import * as assert from 'assert';
import {describe} from "./mocha-puppetter";

//Click on "get started" button make example translation
describe("get started button", function () {
    it("'get started' button displays example translation", async () => {
        await this.page.waitForSelector('.btn-primary');
        await this.page.click(".btn-primary");
        const phrasesList = await this.page.$("#example-phrases-preview");

        if (phrasesList) assert.equal(await phrasesList.isIntersectingViewport(), true);
        else throw new Error("phrases list element not found");
    });
});
