const jagadishBdayModel = require("../../models/jagadishBdayModel");

const jagadishBdayController = async (req, res) => {
  const { page, attempt = 0 } = req.query;
  await new jagadishBdayModel({
    page: page,
    attempt: attempt
  }).save()
  res.status(200).json({ message: "saved" })
}


module.exports = jagadishBdayController