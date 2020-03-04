import * as assert from 'assert';
import {describe, Suite} from "./mocha-puppetter";

//Click on "show more" button displays full list of example phrases
describe('show more button', function (this: Suite) {
    let word = 'cat';
    const inputFieldS = "#queryInput";
    const submitBtnS = "#btn-submit";
    const showMoreBtnS = "#btn-show-more";
    const phrasesFullListS = "#example-phrases-full";

    before(async () => {
        await this.page.waitForSelector(inputFieldS);
        await this.page.focus(inputFieldS);
        await this.page.keyboard.type(word);
        await this.page.click(submitBtnS);
    });


    it("'show more' button displays full list of phrases", async () => {
        await this.page.waitForSelector(showMoreBtnS);
        await this.page.focus(showMoreBtnS);
        await this.page.keyboard.press("Enter");
        await this.page.waitForSelector(phrasesFullListS);
        const phrasesList = await this.page.$(phrasesFullListS);

        if (phrasesList) assert.equal(await phrasesList.isIntersectingViewport(), true);
        else throw new Error("phrases list element not found");
    });
});
