const express = require("express");
const {
  getAllUsers,
  registerUser,
  verifyUserCredentials,
  getUserById,
  toggleRole,
  updateProfile,
  deleteUser,
} = require("../services/userService.js");
const { handleSuccess, handleError } = require("../utils/functionHandlers.js");
const {
  profileValidation,
  loginValidation,
} = require("../middleware/userValidation.js");
const {
  authenticateUser,
  adminAuth,
  userAdminAuth,
  lockoutCheck,
  verifyCredentials,
} = require("../middleware/authService.js");
const { generateAuthToken } = require("../auth/providers/jwt.js");

const userRouter = express.Router();

// 1 - Get all users - Admin only
userRouter.get("/", authenticateUser, adminAuth, async (_req, res) => {
  try {
    const users = await getAllUsers();
    handleSuccess(res, 200, users);
  } catch (error) {
    handleError(res, error.status || 500, error.message);
  }
});

// 2 - Get user by ID
userRouter.get("/:id", authenticateUser, userAdminAuth, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await getUserById(userId);
    handleSuccess(res, 200, user);
  } catch (error) {
    handleError(res, error.status, error.message);
  }
});

// 3 - Register a new user
userRouter.post("/register", profileValidation, async (req, res) => {
  try {
    const userData = req.body;
    const user = await registerUser(userData);
    const responseMessage = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    handleSuccess(res, 200, responseMessage);
  } catch (error) {
    handleError(res, error.status, error.message);
  }
});

// 4 - User login
userRouter.post(
  "/login",
  loginValidation,
  lockoutCheck,
  verifyCredentials,
  async (req, res) => {
    try {
      const token = generateAuthToken(req.user);
      handleSuccess(res, 200, token, "Login successful");
    } catch (error) {
      handleError(res, error.status, error.message);
    }
  },
);

// 5 - Update user profile
userRouter.put("/:id", authenticateUser, async (req, res) => {
  try {
    const userId = req.user._id;
    const updateData = req.body;
    const updatedUser = await updateProfile(userId, updateData);
    handleSuccess(res, 200, updatedUser);
  } catch (error) {
    handleError(res, error.status, error.message);
  }
});

// 6 - Toggle user role - Admin only
userRouter.patch("/:id", authenticateUser, userAdminAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const updatedUser = await toggleRole(userId);
    handleSuccess(res, 200, updatedUser);
  } catch (error) {
    handleError(res, error.status, error.message);
  }
});

// 7 - Delete user
userRouter.delete("/:id", authenticateUser, userAdminAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    await deleteUser(userId);
    handleSuccess(res, 200, "User deleted successfully");
  } catch (error) {
    handleError(res, error.status, error.message);
  }
});

module.exports = userRouter;
