const MatchHistoryCrawler = require('../../../src/crawlers/gamepedia/match-history');
const assert = require('assert');
const describe = require('mocha').describe;
const it = require('mocha').it;
const beforeEach = require('mocha').beforeEach;


describe('integration tests for gamepedia match history pager', () => {

    const url = 'https://lol.gamepedia.com/2017_Season_World_Championship/Main_Event/Match_History';
    let matchHistoryCrawler = new MatchHistoryCrawler(url);

    beforeEach(async () => {
        await matchHistoryCrawler.setPageData();
    });

    it('writes mach history table data into file', async() => {
        const table = await matchHistoryCrawler.getTable();
        assert.equal(table.rows.length, 80);
        assert.equal(Object.keys(table.headers).length, 14);
    });
});
