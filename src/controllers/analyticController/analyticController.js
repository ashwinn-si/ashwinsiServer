const analyticModel = require("./../../models/analyticsModel")

const addAnalyticDetails = async (req, res) => {
  try {
    const trafficType = req.query.trafficType;

    const website = req.query.website;
    if (!website) {
      throw Error("WEBSITE NOT FOUND");
    }

    const newAnalytic = new analyticModel({
      website: website,
      trafficType: trafficType
    });

    await newAnalytic.save();

    res.status(200).json({ message: "analytics saved" })
  } catch (err) {
    res.status(500).json({ message: "internal server error" })
  }
}

const getAnalyticDetails = async (req, res) => {
  try {
    const website = req.query.website;
    const date = req.query.date; // Expected format: YYYY-MM-DD

    if (!website) {
      throw Error("WEBSITE NOT FOUND");
    }

    // Validate date format if provided
    if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid date format. Use YYYY-MM-DD"
      });
    }

    // Build query filter
    let query = { website: website };

    // If date is provided, filter by date
    if (date) {
      const startOfDay = new Date(date);
      const endOfDay = new Date(date);
      endOfDay.setDate(endOfDay.getDate() + 1);

      query.createdAt = {
        $gte: startOfDay,
        $lt: endOfDay
      };
    }

    // Get analytics data based on query
    const analyticsData = await analyticModel.find(query).select([
      "website",
      "trafficType",
      "createdAt",
      "-_id"
    ]);

    // Aggregate traffic types
    let trafficStats = {
      normal: 0,
      portfolio: 0,
      linkdin: 0,
      total: 0
    };

    // Process the filtered data
    const processedData = analyticsData.map((element) => {
      // Count traffic types
      if (element.trafficType) {
        trafficStats[element.trafficType] = (trafficStats[element.trafficType] || 0) + 1;
      }
      trafficStats.total += 1;

      // Convert to IST timezone
      const createdAtIST = new Date(element.createdAt).toLocaleString(
        "en-IN",
        { timeZone: "Asia/Kolkata", hour12: false }
      );

      return {
        website: element.website,
        trafficType: element.trafficType,
        time: createdAtIST.split(",")[1].trim().split(" ")[0],
        date: createdAtIST.split(",")[0]
      };
    });

    res.status(200).json({
      status: "success",
      website: website,
      date: date || "all dates",
      totalViews: trafficStats.total,
      trafficBreakdown: {
        normal: trafficStats.normal,
        portfolio: trafficStats.portfolio,
        linkdin: trafficStats.linkdin
      },
      analyticsData: processedData,
      count: processedData.length
    });

  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message
    });
  }
}

module.exports = { addAnalyticDetails, getAnalyticDetails }