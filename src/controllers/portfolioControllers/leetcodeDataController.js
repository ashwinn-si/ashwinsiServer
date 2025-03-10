const axios = require("axios")

const leetcodeDataUtils = require("./../../utils/portfolioUtils/leetcodeDataUtils")

const leetcodeDataController = async (req, res) => {
    try{
        const data = await leetcodeDataUtils();
        if(data.length === 0){
            throw new Error("data not found");
        }
        res.status(200).json(data);
    }catch(err){
        res.status(500).json({message: "internal server error"})
    }
}

module.exports = leetcodeDataController