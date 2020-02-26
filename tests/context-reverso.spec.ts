import * as sinon from 'sinon';
import * as assert from 'assert';
import "mocha"
import * as ContextReverso from "../src/context-reverso"
import * as cheerio from "cheerio";

// Check if the page make translation request through reverso
describe('context-reverso', function () {
    describe('Service', function () {
        it('translate request', async () => {
            let service = await new ContextReverso.Service();

            let fakeData = await cheerio.load("someString");
            const cheerioStub = await sinon.stub(cheerio, "load");
            await cheerioStub.returns(fakeData);

            const requestStub = await sinon.stub(service.endpoint, "request");
            let fakeResponse = {};
            requestStub.resolves(Promise.resolve(fakeResponse));

            await service.translate("cat");

            await assert.equal(requestStub.callCount, 1);
            await cheerioStub.restore();
            await requestStub.restore();
        });
    });
});
