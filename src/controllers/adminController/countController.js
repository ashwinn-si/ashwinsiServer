const portfolioModel = require("../../models/portfolioModel");

const countController = async (req, res) => {
    try{
        console.log("started to fetch")
        const count = await portfolioModel.find();
        res.status(200).json(count.length);
    }catch(err){
        res.status(500).json({message: "internal server error"})
    }
    
}

module.exports = countController