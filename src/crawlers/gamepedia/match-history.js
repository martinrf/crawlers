const axios = require('axios');
const cheerio = require('cheerio');
const $ = require('cheerio');

module.exports = class MatchHistoryCrawler {

  constructor(url) {
    this.data = {};
    this.url = url;
  }

  getData(){
    return this.data;
  }

  async getPage() {
    if (!this.url) return null;
    const page = await axios.get(this.url);
    return page;
  }

  async setPageData(){
    const page = await this.getPage(this.url);
    this.data = page.data;
    return this.data;
  }

  async getRows(){
    const $ = cheerio.load(this.data);
    let table = [];
    // let headers = {};
    $('.wide-content-scroll table tr').each((i, tr) => {
      //console.log(i);
      if (i === 1){
        //headers = this.getRowHeaders($(tr).html());
      }
      if (i === 3){
        const links =  $(tr).find( 'a' );
        // const tds = $(tr).html();
        for(let j = 0; j < links.length; j++){
          //console.log(j, $(links[j]).attr('href'));
          //console.log(j, headers[j], tds);
          table.push({
            'patch': $(links[0]).attr('href')
          });
        }
      }
    });
    return table;
  }

  getRowHeaders(tr) {
    let ths = $('th', tr);
    let headers = [];
    for (let i = 0; i < ths.length; i++) {
      const head = $(ths[i]).text();
      headers.push(this.cleanHeader(head, i));
    }
    return {...headers};
  }

  cleanHeader(headerText, index){
    if (headerText === 'P'){
      headerText = 'patch';
    }
    if (headerText === 'Bans' || headerText === 'Picks'){
      if (index === 5 || index === 7) headerText = `blue_${headerText}`;
      else headerText = `red_${headerText}`;
    }
    if (headerText === 'MH'){
      headerText = 'match_history';
    }
    return headerText.toLowerCase().replace(' ', '_');
  }

  cleanRow(td, index){
    let value = '';
    if (index === 0) // date
      value = td;
    else if (index === 1) // patch
      value = $(td).text();
    else {
      const link = $('a', td);
      if (link.length === 1){
        if (index === 12 || index === 13){ // match history and vod
          value = $(link).attr('href');
        }else{
          value = $(link).attr('title'); // team names, winner
        }
      }else{ // team rosters
        for(let i = 0; i < link.length; i++){
          value += $(link[i]).attr('title') + ' ';
        }
        value = value.trimEnd();
      }
    }
    return value;
  }

  getRow(headers, tr) {
    let tds = $('td', tr);
    let row = {};
    for (let i = 0; i < tds.length; i++){
      const value = this.cleanRow($(tds[i]).html(), i);
      row[headers[i]] = value;
    }
    return row;
  }
};
