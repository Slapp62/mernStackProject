const User = require('../validation/mongoSchemas/schemas');

const getAllUsers = async () => {
  return await User.find({});
}  

module.exports = { getAllUsers };