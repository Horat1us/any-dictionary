import * as assert from 'assert';
import {describe} from "./mocha-puppetter";

//Click on "get started" button make example translation
describe("click and start button", function () {
    const clickAndStartBtnS = "#click-and-start-btn";
    const phraseListS = "#example-phrases-preview";
    
    it("'click and start' button displays translation example", async () => {
        await this.page.waitForSelector(clickAndStartBtnS);
        await this.page.click(clickAndStartBtnS);
        const phrasesList = await this.page.$(phraseListS);

        if (phrasesList) assert.equal(await phrasesList.isIntersectingViewport(), true);
        else throw new Error("phrases list element not found");
    });
});
