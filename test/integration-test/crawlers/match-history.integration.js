const MatchHistoryCrawler = require('../../../src/crawlers/gamepedia/match-history');
const assert = require('assert');

describe('integration tests for gamepedia match history pager', () => {

  const url = 'https://lol.gamepedia.com/LCS/2019_Season/Spring_Season/Match_History';
  let matchHistoryCrawler = new MatchHistoryCrawler(url);
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
    const pageData = await matchHistoryCrawler.setPageData();
    assert.ok(pageData);
  });

  it('gets a list of match rows', async() => {
    await matchHistoryCrawler.setPageData();
    const table = await matchHistoryCrawler.getRows();
    assert.ok(table);
  });
});
