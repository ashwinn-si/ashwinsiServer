const express = require('express');
const router = express.Router();

const gpacgpaRouter = require("./../controllers/gpaCgpaCal")

router.post("/add-gpa", gpacgpaRouter.addGPA);
router.post("/add-cgpa", gpacgpaRouter.addCGPA);

module.exports = router;