const express = require("express");

const router = express.Router();

const problemController = require("../controllers/problem.controller");

router.post("/", problemController.createProblem);

router.get("/", problemController.getAllProblems);

router.get("/:slug", problemController.getProblem);

router.put("/:id", problemController.updateProblem);

router.delete("/:id", problemController.deleteProblem);

module.exports = router;