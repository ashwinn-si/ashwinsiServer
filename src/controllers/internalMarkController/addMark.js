const internalMarkModel = require("../../models/internalMark")

const addMarkController = async (req, res) => {
  try {
    const newMark = new internalMarkModel({
      mark: req.body.mark,
      nptel: req.body.nptel,
      bonus: req.body.bonus,
      m1Mark: req.body.m1Mark,
      m2Mark: req.body.m2Mark,
      m3Mark: req.body.m3Mark
    })

    newMark.save();
    res.status(200).json({ message: "mark added" });
  } catch (err) {
    res.status(500).json({ message: "internal server error" })
  }
}

module.exports = addMarkController