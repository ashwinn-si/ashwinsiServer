import grammarModel from "./../../models/grammarCorrectionModel.js"
import mongoose from 'mongoose';

const getGrammerCorrectionController = async (req, res) => {
  const { text, jonner } = req.body;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      // Save the original request
      const savedData = await new grammarModel({
        originalText: text,
        jonner: jonner
      }).save({ session });

      // Get response from API
      const { data } = await getResponseFromAPI({ text, jonner });

      // Update with the correction results
      await grammarModel.findByIdAndUpdate(savedData._id, {
        resultText: data.text
      }, { session });

      res.status(200).json({
        data: data,
        message: "Successfully transformed"
      });
    });
  } catch (err) {
    console.error("Grammar correction error:", err.message);
    res.status(500).json({
      message: "Error in making correction"
    });
  } finally {
    session.endSession();
  }
};

const getResponseFromAPI = async ({ text, jonner }) => {
  try {

  } catch (err) {
    throw err;
  }
}