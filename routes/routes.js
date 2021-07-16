const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

router.get("/boardstate",controller.getBoard)

router.post("/boardstate",controller.updateBoard)

module.exports = router;