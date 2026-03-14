const internalMarkModel = require("../../models/internalMark")

const addMarkController = async (req, res) => {
  try {
    const normalizedCategory = ["HOPE Elite", "PEP", "General"].includes(req.body.category)
      ? req.body.category
      : "General";

    const newMark = new internalMarkModel({
      mark: req.body.mark,
      nptel: req.body.nptel,
      bonus: req.body.bonus,
      category: normalizedCategory,
      pt1: req.body.pt1,
      pt2: req.body.pt2,
      pt3: req.body.pt3,
      m1Mark: req.body.m1Mark,
      m2Mark: req.body.m2Mark,
      m3Mark: req.body.m3Mark
    })

    await newMark.save();
    res.status(200).json({ message: "mark added" });
  } catch (err) {
    res.status(500).json({ message: "internal server error" })
  }
}

module.exports = addMarkController