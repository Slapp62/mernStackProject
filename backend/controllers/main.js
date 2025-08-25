const { Router } = require("express");
const userRouter = require("./usersController.js");
const cardRouter = require("./cardsController.js");

const router = Router();

// main api router
router.use("/api/users", userRouter);
router.use("/api/cards", cardRouter);

module.exports = router;
