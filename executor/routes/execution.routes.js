const express = require("express");

const router = express.Router();

const executionController = require("../controllers/execution.controller");

router.post("/", executionController.run);

module.exports = router;