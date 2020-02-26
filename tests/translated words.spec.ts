import * as assert from 'assert';
import {describe} from "./mocha-puppetter";

// Translate word and check if the words display on page
describe('translated words', function () {
    let word = 'cat';
    const inputFieldS = "#queryInput";
    const submitBtnS = "#btn-submit";
    const translatedWordS = ".translated-word";

    before(async () => {
        await this.page.waitForSelector(inputFieldS);
        await this.page.focus(inputFieldS);
        await this.page.keyboard.type(word);
        await this.page.click(submitBtnS);
    });


    it('words display on page', async () => {
        await this.page.waitForSelector(translatedWordS);

        let translatedWordElement = await this.page.$(translatedWordS);
        let translatedWord = await this.page.evaluate(x => x.value, translatedWordElement);
        if (translatedWord) assert.notEqual(await translatedWord.length, 0);
        else throw new Error("word not exist");
    });

});
