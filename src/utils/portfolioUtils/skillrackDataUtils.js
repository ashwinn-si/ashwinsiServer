const cheerio = require('cheerio');
const axios = require('axios');
require("dotenv").config();

const skillrackDataUtils = async() => {
    try{
        const url = process.env.SKILLRACK_URL
        const urlParams = new URLSearchParams(new URL(url).search);
        const id = urlParams.get('id');

        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        // Extract data from the page
        const rawText = $('div.ui.four.wide.center.aligned.column').text().trim().split('\n');

        //extracting the require data
        const rank = parseInt($('div:contains("RANK")').find('.value').text().trim()) || 0;
        const codeTestCount = parseInt($('div:contains("PROGRAMS SOLVED")').next().find('.value').text().trim()) || 0;
        const codeTutorCount = parseInt($('div:contains("DT")').next().find('.value').text().trim()) || 0;
        const bronzeCount = parseInt($('div:contains("SILVER")').next().find('.value').text().trim()) || 0;
        const codeTracksCount = parseInt($('div:contains("CODE TEST")').next().find('.value').text().trim()) || 0;
        const dtCount = parseInt($('div:contains("DC")').next().find('.value').text().trim()) || 0;
        const dcCount = parseInt($('div:contains("CODE TRACK")').next().find('.value').text().trim()) || 0;
        const totalProblemsSolved = dtCount + dcCount + codeTracksCount + codeTestCount + codeTutorCount;

        return{
            codeTracksCount,
            dtCount,
            dcCount,
            bronzeCount,
            rank,
            totalProblemsSolved
        }
        
    }catch(err){
        console.log(err);
        return {};
    }
    
}

module.exports = skillrackDataUtils