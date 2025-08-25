const express = require("express");
const { getAllUsers } = require("../services/userService.js");

const userRouter = express.Router();

userRouter.get("/", async (_req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = userRouter;