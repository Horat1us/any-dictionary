import * as assert from 'assert';
import {describe} from "./mocha-puppetter";

// Translate word and check if the words display on page
describe('translated words', function () {
    let word = 'cat';

    before(async () => {
        await this.page.waitForSelector('#queryInput');
        await this.page.focus('#queryInput');
        await this.page.keyboard.type(word);
        await this.page.click('#btn-submit');
    });


    it('words display on page', async () => {
        await this.page.waitForSelector('.translated-word');

        let translatedWordElement = await this.page.$('.translated-word');
        let translatedWord = await this.page.evaluate(x => x.value, translatedWordElement);
        if (translatedWord) assert.notEqual(await translatedWord.length, 0);
        else throw 'word not exist';
    });

});
