const skillrackDataUtils = require("./../../utils/portfolioUtils/skillrackDataUtils");

const skillrackDataController = async (req, res) => {
    try{
        const data = await skillrackDataUtils();
        if(data.length === 0){
            throw new Error("data not found");
        }
        res.status(200).json(data);
    }
    catch(err){
        res.status(500).json({message: "internal server error"})
    }
    
}

module.exports = skillrackDataController