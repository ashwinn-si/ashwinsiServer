const jeeviaBdayModel = require("../../models/jeeviaBdayModel")

const jeeviaBdayController = async (req, res) => {
  await new jeeviaBdayModel().save()
  res.status(200).json({ message: "saved" })
}

const jeeviaBdayCountController = async (req, res) => {
  try {
    console.log("started to fetch")
    const count = await jeeviaBdayModel.find();
    res.status(200).json(count.length);
  } catch (err) {
    res.status(500).json({ message: "internal server error" })
  }

}

const jeeviaBdayDateController = async (req, res) => {
  try {
    const date = req.query.date; // Expected format: YYYY-MM-DD
    const data = await jeeviaBdayModel.find({}).select(["createdAt", "-_id"]);

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

module.exports = { jeeviaBdayController, jeeviaBdayDateController, jeeviaBdayCountController }