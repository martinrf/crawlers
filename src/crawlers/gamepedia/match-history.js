const axios = require('axios');
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
        return await axios.get(this.url);
    }

    async setPageData(){
        const page = await this.getPage(this.url);
        this.data = page.data;
        return this.data;
    }

    async getTable(){
        let table = {};
        table.rows = [];
        $('.wide-content-scroll table tr', this.data).each((i, tr) => {
            if (i === 1){
                table.headers = this.getRowHeaders($(tr).html());
            }
            if (i >= 3){
                const row = this.getRow(table.headers, $(tr).html());
                table.rows.push(row);
            }
        });
        return table;
    }

    /***
   * Gets and object which keys are the index number of a table header and its value the title of the row.
   * @param tr
   * @returns {{}}
   */
    getRowHeaders(tr) {
        let ths = $('th', tr);
        let headers = {};
        for (let i = 0; i < ths.length; i++) {
            const head = $(ths[i]).text();
            headers[i] = this.cleanHeader(head, i);
        }
        return headers;
    }

    /***
   * Gets an object form a table row.
   * @param headers
   * @param tr
   * @returns {{}}
   */
    getRow(headers, tr) {
        let tds = $('td', tr);
        let row = {};
        for (let i = 0; i < tds.length; i++){
            row[headers[i]] = this.cleanRow($(tds[i]).html(), i);
        }
        return row;
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
};
