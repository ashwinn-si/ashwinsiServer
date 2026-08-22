const internalMarkModel = require("../../models/internalMark");

const ALLOWED_CATEGORIES = ["HOPE Elite", "PEP", "General"];

const backfillNewFields = async (req, res) => {
  try {
    const result = await internalMarkModel.updateMany(
      {},
      [
        {
          $set: {
            category: {
              $cond: [
                {
                  $or: [
                    { $eq: [{ $type: "$category" }, "missing"] },
                    { $eq: ["$category", null] },
                    { $not: [{ $in: ["$category", ALLOWED_CATEGORIES] }] }
                  ]
                },
                "General",
                "$category"
              ]
            },
            pt1: { $ifNull: ["$pt1", null] },
            pt2: { $ifNull: ["$pt2", null] },
            pt3: { $ifNull: ["$pt3", null] },
            m1Mark: { $ifNull: ["$m1Mark", null] },
            m2Mark: { $ifNull: ["$m2Mark", null] },
            m3Mark: { $ifNull: ["$m3Mark", null] }
          }
        }
      ]
    );

    return res.status(200).json({
      message: "internal mark fields backfilled",
      data: {
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount,
        fields: ["category", "pt1", "pt2", "pt3", "m1Mark", "m2Mark", "m3Mark"]
      }
    });
  } catch (err) {
    return res.status(500).json({
      message: "internal server error",
      error: err.message
    });
  }
};

module.exports = backfillNewFields;