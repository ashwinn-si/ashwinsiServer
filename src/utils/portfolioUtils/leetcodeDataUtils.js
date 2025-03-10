const axios = require("axios")
require("dotenv").config();

const leetcodeDataUtils = async() => {
    try{
        const response = await axios.get(process.env.LEETCODE_URL)
        const totalSubmission = response.data.totalSubmissions;
        const ranking = response.data.ranking ;
        return{
            easy : parseInt(totalSubmission[1].count),
            medium : parseInt(totalSubmission[2].count),
            hard : parseInt(totalSubmission[3].count),
            rank : ranking
        }
    }catch(err){
        return {};
    }
    
}

module.exports = leetcodeDataUtils