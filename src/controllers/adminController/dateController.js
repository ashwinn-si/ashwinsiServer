const portfolioModel = require("../../models/portfolioModel");

const dateController = async (req, res) => {
    try {
        const date = req.query.date; // Expected format: YYYY-MM-DD
        const data = await portfolioModel.find({}).select(["createdAt", "-_id"]);

        const filteredData = data
            .filter((element) => {
                const createdAtUTC = new Date(element.createdAt).toISOString().split("T")[0]; 
                return createdAtUTC === date; // Compare only the date part
            })
            .map((element) => {
                const createdAtIST = new Date(element.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: false });
                return { time: createdAtIST.split(",")[1].trim().split(" ")[0] }; // Return full IST time
            });

        res.status(200).send({
            status: "success",
            data: filteredData,
            length: filteredData.length,
        });
    } catch (e) {
        res.status(500).send({
            status: "error",
            error: e.message,
        });
    }
};

module.exports = dateController;
