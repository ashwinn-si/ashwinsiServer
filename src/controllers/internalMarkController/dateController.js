const InternalMarkModel = require("../../models/internalMark");

const mergeNumericCriteria = (totals, splitUp) => {
  if (!splitUp || typeof splitUp !== "object" || Array.isArray(splitUp)) {
    return;
  }

  Object.entries(splitUp).forEach(([key, value]) => {
    const numericValue = Number(value);
    if (!Number.isNaN(numericValue)) {
      totals[key] = (totals[key] || 0) + numericValue;
    }
  });
};

const hasObjectData = (value) => {
  return (
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.keys(value).length > 0
  );
};

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
      "category",
      "pt1",
      "pt2",
      "pt3",
      "createdAt",
      "-_id",
    ]);

    let responseMarkData = {
      mark: [],
      nptel: 0,
      bonus: 0,
      category: {
        "HOPE Elite": 0,
        "PEP": 0,
        "General": 0,
      },
      pt1: {
        entries: [],
        criteriaTotals: {},
        withDataCount: 0,
        withoutDataCount: 0,
      },
      pt2: {
        entries: [],
        criteriaTotals: {},
        withDataCount: 0,
        withoutDataCount: 0,
      },
      pt3: {
        entries: [],
        criteriaTotals: {},
        withDataCount: 0,
        withoutDataCount: 0,
      }
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
      const normalizedCategory = responseMarkData.category[element.category] !== undefined
        ? element.category
        : "General";
      responseMarkData.category[normalizedCategory] += 1;

      if (hasObjectData(element.pt1)) {
        responseMarkData.pt1.entries.push(element.pt1);
        responseMarkData.pt1.withDataCount += 1;
      } else {
        responseMarkData.pt1.withoutDataCount += 1;
      }

      if (hasObjectData(element.pt2)) {
        responseMarkData.pt2.entries.push(element.pt2);
        responseMarkData.pt2.withDataCount += 1;
      } else {
        responseMarkData.pt2.withoutDataCount += 1;
      }

      if (hasObjectData(element.pt3)) {
        responseMarkData.pt3.entries.push(element.pt3);
        responseMarkData.pt3.withDataCount += 1;
      } else {
        responseMarkData.pt3.withoutDataCount += 1;
      }

      mergeNumericCriteria(responseMarkData.pt1.criteriaTotals, element.pt1);
      mergeNumericCriteria(responseMarkData.pt2.criteriaTotals, element.pt2);
      mergeNumericCriteria(responseMarkData.pt3.criteriaTotals, element.pt3);

      const parsedMark = parseInt(element.mark, 10);
      if (!Number.isNaN(parsedMark)) {
        responseMarkData.mark.push(parsedMark);
      }
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
      categoryData: responseMarkData.category,
      pt1Data: responseMarkData.pt1,
      pt2Data: responseMarkData.pt2,
      pt3Data: responseMarkData.pt3,
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
