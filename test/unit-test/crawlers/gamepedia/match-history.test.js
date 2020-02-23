const proxyquire = require('proxyquire').noCallThru();
const stubAxios = {
    'get': () => { return { 'Status': 200, 'StatusText': 'OK', 'data' : '<html></html>' }; }
};
const MatchHistoryCrawler = proxyquire('../../../../src/crawlers/gamepedia/match-history', {
    'axios': stubAxios
});
const assert = require('assert');
const describe = require('mocha').describe;
const it = require('mocha').it;
const beforeEach = require('mocha').beforeEach;
describe('Gamepedia Matchi History Crawlers', () => {
    describe('get match history gamepedia page', () => {
        let matchHistoryCrawler;
        const url = 'https://www.weblink.com/test1/test2/test3';
        beforeEach(()=>{
            matchHistoryCrawler = new MatchHistoryCrawler(url);
        });

        it('getPage makes an axios get request of the url and returns only the content of it', async () => {
            const webPage = await matchHistoryCrawler.getPage();
            assert.ok(webPage);
        });

        it('gets the page data for the given url', async () => {
            const pageData = await matchHistoryCrawler.setPageData();
            assert.ok(pageData);
            assert.equal(pageData, '<html></html>');
        });
    });
});
