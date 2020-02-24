import * as assert from "assert";
import {describe} from "./mocha-puppetter";

// translate word and check if the words in the input and in the example phrases are equal
describe("example phrases", function () {
    const word = "cat";

    before(async () => {
        await this.page.waitForSelector('#queryInput');
        await this.page.focus('#queryInput');
        await this.page.keyboard.type(word);
        await this.page.click('#btn-submit');
    });

    it('word in the example phrases equal to the word in the input', async () => {
        const wordElement = await this.page.$('#example-phrases-preview li div div mark');
        const wordText = await this.page.evaluate(x => x.innerText, wordElement);
        assert.equal(wordText, word);
    });
});
