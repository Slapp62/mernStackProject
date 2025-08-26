const { verifyPassword, encryptPassword } = require('../utils/bcrypt');
const Cards = require('../validation/mongoSchemas/cardsSchema');
const Users = require('../validation/mongoSchemas/usersSchema');

const getAllUsers = async () => {
  return await Users.find({});
}  

const createUser = async (userData) => {
  try {
    const encryptedPassword = await encryptPassword(userData.password);
    userData.password = encryptedPassword;

    const newUser = new Users(userData);
    return await newUser.save();
  } catch (error) {
    throw new Error('Error creating user: ' + error.message);
  }
}

const getUserById = async (userId) => {
  return await Users.findById(userId);
}

const verifyUserCredentials = async (email, enteredPassword) => {
  const user = await Users.findOne({ email });
  const savedPassword = user.password;

  if (!user) {
    throw new Error('Invalid email');
  }
  
  const isPasswordValid = await verifyPassword(enteredPassword, savedPassword);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }
}

const updateProfile = async (userId, updateData) => {
  return await Users.findByIdAndUpdate(userId, updateData, { new: true });
}

const toggleRole = async (userId) => {
  const user = await Users.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  const isBusiness = !user.isBusiness;
  return await Users.findByIdAndUpdate(userId, { isBusiness }, { new: true });
}

const deleteUser = async (userId) => {
  return await Users.findByIdAndDelete(userId);
}


module.exports = { 
  getAllUsers, 
  createUser, 
  getUserById, 
  verifyUserCredentials, 
  toggleRole,
  updateProfile,
  deleteUser
};