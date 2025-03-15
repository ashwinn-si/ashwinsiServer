const cheerio = require('cheerio');
const axios = require('axios');
require("dotenv").config();

const skillrackDataUtils = async () => {
    try {
        const url = process.env.SKILLRACK_URL;
        if (!url) throw new Error("SKILLRACK_URL is not set in the environment variables.");

        // Setting headers to mimic a browser
        

        // Fetch the webpage
        const { data } = await axios.get(url);
        console.log(data);
        const $ = cheerio.load(data);

        // Extracting required data
        const rank = parseInt($('div:contains("RANK")').find('.value').text().trim()) || 0;
        const codeTestCount = parseInt($('div:contains("PROGRAMS SOLVED")').next().find('.value').text().trim()) || 0;
        const codeTutorCount = parseInt($('div:contains("DT")').next().find('.value').text().trim()) || 0;
        const bronzeCount = parseInt($('div:contains("SILVER")').next().find('.value').text().trim()) || 0;
        const codeTracksCount = parseInt($('div:contains("CODE TEST")').next().find('.value').text().trim()) || 0;
        const dtCount = parseInt($('div:contains("DC")').next().find('.value').text().trim()) || 0;
        const dcCount = parseInt($('div:contains("CODE TRACK")').next().find('.value').text().trim()) || 0;
        const totalProblemsSolved = dtCount + dcCount + codeTracksCount + codeTestCount + codeTutorCount;

        return {
            codeTracksCount,
            dtCount,
            dcCount,
            bronzeCount,
            rank,
            totalProblemsSolved
        };
    } catch (error) {
        console.error("❌ Error fetching SkillRack data:", error.message);
        return null;
    }
};

module.exports = skillrackDataUtils;
