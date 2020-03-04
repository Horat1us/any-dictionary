import * as assert from "assert";
import {describe, Suite} from "./mocha-puppetter";

// Translate word and check if the words in the input and in the example phrases are equal
describe("example phrases", function (this: Suite) {
    const word = "cat";
    const inputFieldS = "#queryInput";
    const submitBtnS = "#btn-submit";
    const translatedWordS = "#example-phrases-preview li div div mark";

    before(async () => {
        await this.page.waitForSelector(inputFieldS);
        await this.page.focus(inputFieldS);
        await this.page.keyboard.type(word);
        await this.page.click(submitBtnS);
    });

    it('word in the example phrases equal to the word in the input', async () => {
        const wordElement = await this.page.$(translatedWordS);
        const wordText = await this.page.evaluate(x => x.innerText, wordElement);
        assert.equal(wordText, word);
    });
});
