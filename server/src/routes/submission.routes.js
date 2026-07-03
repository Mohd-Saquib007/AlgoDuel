const express = require("express");

const router = express.Router();

const submissionController = require("../controllers/submission.controller");
const auth = require("../middleware/auth.middleware");

router.post("/", auth, submissionController.createSubmission);

router.get("/my", auth, submissionController.getUserSubmissions);

module.exports = router;