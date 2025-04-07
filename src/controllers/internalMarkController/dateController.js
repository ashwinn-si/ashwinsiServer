const InternalMarkModel = require("../../models/internalMark");

const dateController = async (req, res) => {
    try {
        const date = req.query.date; // Expected format: YYYY-MM-DD
        const viewData = await InternalMarkModel.find({}).select([
            "createdAt",
            "-_id",
        ]);
        const markData = await InternalMarkModel.find({}).select([
            "mark",
            "nptel",
            "bonus",
            "createdAt",
            "-_id",
        ]);

        let responseMarkData = {
            mark : [],
            nptel : 0,
            bonus : 0
        }
        
        const filteredMarkData = markData.filter((element) => {
                const createdAtUTC = new Date(element.createdAt)
                    .toISOString()
                    .split("T")[0];
                return createdAtUTC === date;
            })
      
        filteredMarkData.forEach((element) => {
            if (element.nptel === "yes") {
                responseMarkData.nptel += 1;
            }
            if (element.bonus === "yes") {
                responseMarkData.bonus += 1;
            }
            responseMarkData.mark.push(parseInt(element.mark));
        });

        const filteredData = viewData
            .filter((element) => {
                const createdAtUTC = new Date(element.createdAt)
                    .toISOString()
                    .split("T")[0];
                return createdAtUTC === date;
            })
            .map((element) => {
                const createdAtIST = new Date(element.createdAt).toLocaleString(
                    "en-IN",
                    { timeZone: "Asia/Kolkata", hour12: false }
                );
                return {
                    time: createdAtIST.split(",")[1].trim().split(" ")[0],
                };
            });
        
        res.status(200).send({
            status: "success",
            viewsData: filteredData,
            nptelData: {
                pass: responseMarkData.nptel,
                fail: filteredData.length - responseMarkData.nptel,
            },
            bonusData: {
                pass: responseMarkData.bonus,
                fail: filteredData.length - responseMarkData.bonus,
            },
            markData: responseMarkData.mark,
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
