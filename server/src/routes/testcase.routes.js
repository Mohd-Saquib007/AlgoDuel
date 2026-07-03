const express = require("express");

const router = express.Router();

const controller = require("../controllers/testcase.controller");

router.post("/", controller.createTestCase);

router.get("/problem/:problemId", controller.getProblemTestCases);

module.exports = router;