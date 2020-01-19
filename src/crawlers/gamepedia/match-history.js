const axios = require('axios');
const cheerio = require('cheerio');
const Match = require('../../persistence/models/match');

module.exports = class MatchHistoryCrawler {

  constructor(url) {
    this.data = {};
    this.url = url;
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
      if (i === 3){
        const links =  $(tr).find( "a" );
       for(let j = 0; j < links.length; j++){
          console.log(j, $(links[j]).attr('href'));
          table.push(new Match({
            'patch': $(links[0]).attr('href')
          }));
        }
      }
    });
    return table;
  }
};
