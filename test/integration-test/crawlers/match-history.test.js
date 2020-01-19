const MatchHistoryCrawler = require('../../../src/crawlers/gamepedia/match-history');
const assert = require('assert');
const describe = require('mocha').describe;
const it = require('mocha').it;
const beforeEach = require('mocha').beforeEach;

describe('integration tests for gamepedia match history pager', () => {

  const url = 'https://lol.gamepedia.com/LCS/2019_Season/Spring_Season/Match_History';
  let matchHistoryCrawler = new MatchHistoryCrawler(url);

  beforeEach(async () => {
    await matchHistoryCrawler.setPageData();
  });

  it('get lcs na summer sprint page', async() => {
    const page = await matchHistoryCrawler.getPage();
    assert.equal(page.statusText, 'OK');
    assert.equal(page.status, 200);
    assert.equal(page.headers['content-type'], 'text/html; charset=UTF-8');
    assert.ok(page.data);
  });

  it('get lcs na summer sprint page 2', async() => {
    const pageData = matchHistoryCrawler.getData();
    assert.ok(pageData);
  });

  it('gets a list of match rows', async() => {
    await matchHistoryCrawler.setPageData();
    const table = await matchHistoryCrawler.getRows();
    assert.ok(table);
  });

  it('gets the row headers from a tr', async() => {
    const tr = '<th>Date</th><th>P</th><th>Blue</th><th>Red</th>' +
      '<th>Winner</th><th>Bans</th><th>Bans</th>' +
      '<th>Picks</th><th>Picks</th><th>Blue Roster</th>' +
      '<th>Red Roster</th><th>SB</th><th>MH</th><th>VOD</th>';
    const headers = await matchHistoryCrawler.getRowHeaders(tr);
    assert.ok(headers);
    assert.equal(headers[0], 'Date');
    assert.equal(headers[1], 'P');
    assert.equal(headers[2], 'Blue');
    assert.equal(headers[3], 'Red');
    assert.equal(headers[4], 'Winner');
    assert.equal(headers[5], 'Bans');
    assert.equal(headers[6], 'Bans');
    assert.equal(headers[7], 'Picks');
    assert.equal(headers[8], 'Picks');
    assert.equal(headers[9], 'Blue Roster');
    assert.equal(headers[10], 'Red Roster');
    assert.equal(headers[11], 'SB');
    assert.equal(headers[12], 'MH');
    assert.equal(headers[13], 'VOD');
  });
});
