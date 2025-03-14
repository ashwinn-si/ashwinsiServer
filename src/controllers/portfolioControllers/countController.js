const portfolioModel = require("./../../models/portfolioModel")

const countController = async (req, res) => {
    try{
        const text = "new viwer"
        const count = await portfolioModel.find();
        const newDetails = new portfolioModel({text});
        await newDetails.save();
        res.status(200).json(count.length + 1);
    }catch(err){
        res.status(500).json({message: "internal server error"})
    }
    
}

module.exports = countController