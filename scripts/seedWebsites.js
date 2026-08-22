require("dotenv").config();
const mongoose = require("mongoose");
const websiteModel = require("../src/models/websiteModel");

const initialWebsites = [
    "solvestack",
    "pathfinder",
    "pdf",
    "convert",
    "internalmarkcalculator"
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to database...");

        for (const name of initialWebsites) {
            const exists = await websiteModel.findOne({ name });
            if (!exists) {
                await websiteModel.create({ name });
                console.log(`Created website: ${name}`);
            } else {
                console.log(`Website already exists: ${name}`);
            }
        }
        
        console.log("Seeding complete.");
    } catch (err) {
        console.error("Error seeding websites:", err);
    } finally {
        mongoose.disconnect();
    }
}

seed();
