import * as assert from 'assert';
import {describe} from "./mocha-puppetter";

//Click on "show more" button displays full list of example phrases
describe('show more button', function () {
    let word = 'cat';

    before(async () => {
        await this.page.waitForSelector('#queryInput');
        await this.page.focus('#queryInput');
        await this.page.keyboard.type(word);
        await this.page.click('#btn-submit');
    });


    it("'show more' button displays full list of phrases", async () => {
        await this.page.waitForSelector('#btn-show-more');
        await this.page.focus('#btn-show-more');
        await this.page.keyboard.press("Enter");
        await this.page.waitForSelector("#example-phrases-full");
        const phrasesList = await this.page.$("#example-phrases-full");

        if (phrasesList) assert.equal(await phrasesList.isIntersectingViewport(), true);
        else throw new Error("phrases list element not found");
    });
});
