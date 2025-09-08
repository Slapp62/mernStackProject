const { encryptPassword } = require("../utils/bcrypt");
const { throwError } = require("../utils/functionHandlers");
const Users = require("../validation/mongoSchemas/usersSchema");

const getAllUsers = async () => {
  const users = await Users.find().select("-password").lean();
  if (!users || users.length === 0) {
    throwError(400, "No users found");
  }
  return users;
};

const registerUser = async (userData) => {
  const existingUser = await Users.findOne({ email: userData.email });
  if (existingUser) {
    const error = new Error("User already exists");
    error.status = 400;
    throw error;
  }

  const encryptedPassword = await encryptPassword(userData.password);
  userData.password = encryptedPassword;
  const newUser = new Users(userData);
  await newUser.save();
  const responseMessage = {
    name: {
      first: newUser.name.first,
      middle: newUser.name.middle,
      last: newUser.name.last,
    },
    address: {
      country: newUser.address.country,
      state: newUser.address.state,
      city: newUser.address.city,
      street: newUser.address.street,
      houseNumber: newUser.address.houseNumber,
      zip: newUser.address.zip,
    },
    phone: newUser.phone,
    image: {
      url: newUser.image.url,
      alt: newUser.image.alt,
    },
    isBusiness: newUser.isBusiness,
    email: newUser.email,
  };
  return responseMessage; 
};

const getUserById = async (userId) => {
  const user = await Users.findById(userId)
    .select("-password -isAdmin -__v")
    .lean();
  if (!user) {
    throwError(404, "User not found");
  }
  return user;
};

const updateProfile = async (userId, updateData) => {
  return await Users.findByIdAndUpdate(userId, updateData, { new: true });
};

const toggleRole = async (userId) => {
  const user = await Users.findById(userId);
  if (!user) {
    throwError(404, "User not found");
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
  toggleRole,
  updateProfile,
  deleteUser,
};
