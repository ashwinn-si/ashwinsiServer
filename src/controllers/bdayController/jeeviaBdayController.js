const jeeviaBdayModel = require("../../models/jeeviaBdayModel")

const jeeviaBdayController = async (req, res) => {
  await new jeeviaBdayModel().save()
  res.status(200).json({ message: "saved" })
}


module.exports = jeeviaBdayController