const cheerio = require('cheerio');
const axios = require('axios');
require("dotenv").config();

const skillrackDataUtils = async () => {
    try {
        const url = process.env.SKILLRACK_URL;
        if (!url) {
            throw new Error("SKILLRACK_URL is not defined in the environment variables.");
        }

        const urlParams = new URLSearchParams(new URL(url).search);
        const id = urlParams.get('id');

        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
                'Referer': 'https://www.skillrack.com/',
            },
        });

        const $ = cheerio.load(data);

        // Extracting required data with improved selector handling
        const extractValue = (label) => {
            const element = $(`div:contains('${label}')`).next().find('.value');
            return element.length ? parseInt(element.text().trim()) || 0 : 0;
        };

        const rank = extractValue("RANK");
        const codeTestCount = extractValue("PROGRAMS SOLVED");
        const codeTutorCount = extractValue("DT");
        const bronzeCount = extractValue("SILVER");
        const codeTracksCount = extractValue("CODE TEST");
        const dtCount = extractValue("DC");
        const dcCount = extractValue("CODE TRACK");
        const totalProblemsSolved = dtCount + dcCount + codeTracksCount + codeTestCount + codeTutorCount;

        return {
            id,
            codeTracksCount,
            dtCount,
            dcCount,
            bronzeCount,
            rank,
            totalProblemsSolved,
        };
    } catch (error) {
        console.error("Error fetching SkillRack data:", error.message);
        return null;
    }
};

module.exports = skillrackDataUtils;