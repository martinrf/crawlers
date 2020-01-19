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
    $('.wide-content-scroll table tr').each((i, tr) => {
      //console.log(i);
      if (i === 1){
        const headers = this.getRowHeaders($(tr).html());
        table.push(headers);
      }
      if (i === 3){
        const links =  $(tr).find( 'a' );
        for(let j = 0; j < links.length; j++){
          //console.log(j, $(links[j]).attr('href'));
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
    for (let d = 0; d < ths.length; d++) {
      headers.push($(ths[d]).text());
    }
    return {...headers};
  }
};
