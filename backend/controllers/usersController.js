const express = require("express");
const { getAllUsers, registerUser, verifyUserCredentials, getUserById, toggleRole, updateProfile, deleteUser } = require("../services/userService.js");
const { handleError } = require("../utils/errorHandler.js");
const { handleSuccess } = require("../utils/handleSuccess.js");
const { profileValidation, loginValidation } = require("../middleware/userValidation.js");
const { verifyToken, adminAuth, userAdminAuth } = require("../middleware/tokenAuth.js");

const userRouter = express.Router();

// Get all users - Admin only
userRouter.get("/", verifyToken, adminAuth, async (_req, res) => {
  try {
    const users = await getAllUsers();
    handleSuccess(res, 200, users);
  } catch (error) {
    handleError(res, 500, error.message);
  }
});

// Get user by ID
userRouter.get("/:id", verifyToken, userAdminAuth, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await getUserById(userId);
    handleSuccess(res, 200, user);
  } catch (error) {
    handleError(res, 500, error.message);
  }
});

// Register a new user
userRouter.post("/register", profileValidation, async (req, res) => {
  try {
    const userData = req.body;
    const user = await registerUser(userData);
    const responseMessage = {
      id: user._id,
      name: user.name,
      email: user.email,
    }
    handleSuccess(res, 200, responseMessage);
  } catch (error) {
    handleError(res, 500, error.message);
  }
});

userRouter.post("/login", loginValidation, async (req, res) => {
  try {
    const { email, password } = req.body;
    await verifyUserCredentials(email, password);
    handleSuccess(res, 200, "Login successful");
  } catch (error) {
    const status = error.status || 500;
    handleError(res, status, error.message);
  }
});

userRouter.put("/update-profile/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;
    const updatedUser = await updateProfile(userId, updateData);
    handleSuccess(res, 200, updatedUser);
  } catch (error) {
    handleError(res, 500, error.message);
  }
});

userRouter.patch("/toggle-role/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await toggleRole(userId);
    handleSuccess(res, 200, updatedUser);
  } catch (error) {
    handleError(res, 500, error.message);
  }
});

userRouter.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    deleteUser(userId);
    handleSuccess(res, 200, "User deleted successfully");
  } catch (error) {
    handleError(res, 500, error.message);
  }
});

module.exports = userRouter;