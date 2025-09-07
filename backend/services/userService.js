const { verifyPassword, encryptPassword } = require("../utils/bcrypt");
const Users = require("../validation/mongoSchemas/usersSchema");
const { generateAuthToken } = require("../auth/providers/jwt");

const getAllUsers = async () => {
  const users = await Users.find().select("-password").lean();
  if (!users || users.length === 0) {
    const error = new Error("No users found");
    error.status = 400;
    throw error;
  }
  return users;
};

const registerUser = async (userData) => {
  try {
    const existingUser = await Users.findOne({ email: userData.email });
    if (existingUser) {
      const error = new Error("User already exists");
      error.status = 400;
      throw error;
    }

    const encryptedPassword = await encryptPassword(userData.password);
    userData.password = encryptedPassword;
    const newUser = new Users(userData);
    return await newUser.save();
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
};

const getUserById = async (userId) => {
  const user = await Users.findById(userId)
    .select("-password -isAdmin -__v")
    .lean();
  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }
  return user;
};

const verifyUserCredentials = async (email, enteredPassword) => {
  const user = await Users.findOne({ email });
  const savedPassword = user.password;
  const isPasswordValid = await verifyPassword(enteredPassword, savedPassword);

  if (!user || !isPasswordValid) {
    const error = new Error("Invalid email or password");
    error.status = 400;
    throw error;
  }

  const token = generateAuthToken(user);
  return token;
};

const updateProfile = async (userId, updateData) => {
  return await Users.findByIdAndUpdate(userId, updateData, { new: true });
};

const toggleRole = async (userId) => {
  const user = await Users.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  const isBusiness = !user.isBusiness;
  return await Users.findByIdAndUpdate(userId, { isBusiness }, { new: true });
};

const deleteUser = async (userId) => {
  return await Users.findByIdAndDelete(userId);
};

module.exports = {
  getAllUsers,
  registerUser,
  getUserById,
  verifyUserCredentials,
  toggleRole,
  updateProfile,
  deleteUser,
};
