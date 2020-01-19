const MatchHistoryCrawler = require('../../../src/crawlers/gamepedia/match-history');
const assert = require('assert');

describe('integration tests for gamepedia match history pager', () => {

  const url = 'https://lol.gamepedia.com/LCS/2019_Season/Spring_Season/Match_History';
  let matchHistoryCrawler = new MatchHistoryCrawler(url);

  beforeEach(async () => {
    await matchHistoryCrawler.setPageData();
  });

  describe('get match history page content', () => {
    it('get lcs na summer sprint page', async() => {
      const page = await matchHistoryCrawler.getPage();
      assert.equal(page.statusText, 'OK');
      assert.equal(page.status, 200);
      assert.equal(page.headers['content-type'], 'text/html; charset=UTF-8');
      assert.ok(page.data);
    });
  });

  it('get lcs na summer sprint page', async() => {
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
    assert.equal(headers.length, 14);
  });
});
