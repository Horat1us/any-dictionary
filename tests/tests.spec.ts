import 'mocha';
import * as assert from 'assert';
import * as sinon from 'sinon';
import * as puppeteer from 'puppeteer';
import * as request from 'request';

import * as translation from "../src/translation"
import * as handler from "../src/handler"
import * as Multitran from "../src/multitran"
import * as ContextReverso from "../src/context-reverso"

process.env.OPEN = '1';


describe('translators', function(){
    it('multitran', async function(){
        const translation = (multitran: Multitran.Service = new Multitran.Service) => {
            return multitran.translate('cat', 1, 2)};

        var result = await translation();
        if (result) assert.notEqual(result.words.length, 0);
        else throw 'result undefined';
    });
    it('reverso', async function(){
        const translation = (contextReverso: ContextReverso.Service = new ContextReverso.Service) => {
            return contextReverso.translate('cat', 1, 2)};

        var result = await translation();
        if (result) assert.notEqual(result.length, 0);
        else throw 'result undefined';
    });
});


describe('puppeteer tests', function(){
    var browser:puppeteer.Browser;
    var page:puppeteer.Page;
    var word = 'cat';

    before(async () => {
                browser = await puppeteer.launch({
                    slowMo: 10,
                    args: [`--window-size=1366,768`],
                    headless: process.env.OPEN !== "1",
                });

                const context = browser.defaultBrowserContext();
                await context.overridePermissions('http://localhost:3000/', ['clipboard-read']);

                page = (await browser.pages())[ 0 ] || await browser.newPage();


                await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
                await page.waitForSelector('#queryInput');
                await page.focus('#queryInput');
                await page.keyboard.type(word);
                await page.click('.form-row button.btn-light');
            });
    after(async () => browser.close());

    it('word in the example phrases equal to the word in the input', async() => {

        var wordElement = await page.$('div.card:nth-child(2) > ul:nth-child(2) > li:nth-child(1) > div:nth-child(1) > div:nth-child(1) > mark:nth-child(1)');
        var wordText = await page.evaluate(x => x.innerText, wordElement);
        assert.equal(wordText, word);
    })

    it('page on translated world exist', (done)=>{
        async function test ()
        {
            var linkElement = await page.$('li.input-group.m-1 div.input-group-prepend a.btn.btn-light');
            var href = await page.evaluate(x => x.href, linkElement);
            request.get(href, function(err:any, response:any) {
                assert.equal(response.statusCode, 200);
                done();
            });
        };
        test();
    });

    it('words dispay on page', async()=> {
        await page.waitForSelector('li.input-group.m-1 input.form-control.bg-light.border-0');
        var translatedWordElement = await page.$('li.input-group.m-1 input.form-control.bg-light.border-0');
        var translatedWord = await page.evaluate(x => x.value, translatedWordElement);
        if (translatedWord) assert.notEqual(await translatedWord.length, 0);
        else throw 'word not exist';
    });

    it('show more dispays full list', async()=> {
        await page.waitForSelector('.btn-outline-primary');
        await page.click('.btn-outline-primary');
        await page.waitForSelector('ul.list-group:nth-child(4)', {
          visible: true,
        })
        var fullList = await page.$('ul.list-group:nth-child(4)');
        if(fullList) assert.equal(await fullList.isIntersectingViewport(), true);
        else throw 'list not found';
    });



    if (process.env.OPEN == '1') {   //works only when headless = false
        it('button \'copy translated word\'', async()=> {
            var buttonCopy = 'article.card:nth-child(1) > ul:nth-child(2) > li:nth-child(1) > ul:nth-child(2) > li:nth-child(1) > div:nth-child(1) > button:nth-child(1) > img:nth-child(1)'
            await page.waitForSelector(buttonCopy);
            await page.click(buttonCopy);

            var translatedWordElement = await page.$('li.input-group.m-1 input.form-control.bg-light.border-0');
            var translatedWord = await page.evaluate(x => x.value, translatedWordElement);
            var clipboardContent = await page.evaluate(async() => await navigator.clipboard.readText());
            assert.equal(clipboardContent, translatedWord);
        });
    };
});
