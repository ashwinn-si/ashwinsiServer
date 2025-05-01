const cgpaModel = require('../models/cgpaModel');
const gpaModel = require('../models/gpaModel');

const addGPA = async (req, res) => {
    const { gpa } = req.body;
    
    if (!gpa) {
        return res.status(400).json({ message: "GPA is required" });
    }

    try {
        const newGPA = new gpaModel({ gpa });
        await newGPA.save();
        return res.json({ message: "GPA added successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error adding GPA", error });
    }
}

const addCGPA = async (req, res) => {
    const { cgpa } = req.body;
    
    if (!cgpa) {
        return res.status(400).json({ message: "CGPA is required" });
    }

    try {
        const newCGPA = new cgpaModel({ cgpa });
        await newCGPA.save();
        return res.json({ message: "CGPA added successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error adding CGPA", error });
    }
}

module.exports = {
    addGPA,
    addCGPA
}