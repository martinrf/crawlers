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
    const headers = matchHistoryCrawler.getRowHeaders(tr);
    assert.ok(headers);
    assert.equal(headers[0], 'date');
    assert.equal(headers[1], 'patch');
    assert.equal(headers[2], 'blue');
    assert.equal(headers[3], 'red');
    assert.equal(headers[4], 'winner');
    assert.equal(headers[5], 'blue_bans');
    assert.equal(headers[6], 'red_bans');
    assert.equal(headers[7], 'blue_picks');
    assert.equal(headers[8], 'red_picks');
    assert.equal(headers[9], 'blue_roster');
    assert.equal(headers[10], 'red_roster');
    assert.equal(headers[11], 'sb');
    assert.equal(headers[12], 'match_history');
    assert.equal(headers[13], 'vod');
  });

  it('get a row of values from the tr', () => {
    const trHeads = '<th>Date</th><th>P</th><th>Blue</th><th>Red</th>' +
      '<th>Winner</th><th>Bans</th><th>Bans</th>' +
      '<th>Picks</th><th>Picks</th><th>Blue Roster</th>' +
      '<th>Red Roster</th><th>SB</th><th>MH</th><th>VOD</th>';
    const headers = matchHistoryCrawler.getRowHeaders(trHeads);
    assert.ok(headers);
    const trValues = require('./tr.sample');
    assert.ok(trValues);
    const row = matchHistoryCrawler.getRow(headers, trValues);
    assert.ok(row);
    assert.equal(row.date, '2019-03-24');
    assert.equal(row.patch, '9.5');
    assert.equal(row.blue, 'FlyQuest');
    assert.equal(row.red, 'Golden Guardians');
    assert.equal(row.winner, 'FlyQuest');
    assert.equal(row.blue_bans, '');
    assert.equal(row.red_bans, '');
    assert.equal(row.blue_picks, '');
    assert.equal(row.red_picks, '');
    assert.equal(row.blue_roster, 'V1per Maxi Pobelter WildTurtle JayJ');
    assert.equal(row.red_roster, 'Hauntzer Contractz Froggen Deftly Olleh');
    assert.equal(row.match_history, 'https://matchhistory.euw.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1074560?gameHash=6a89b0a79afa77c8&tab=overview');
    assert.equal(row.vod, 'https://youtu.be/qBCaf4I9Xjk?t=128');
  });
});
