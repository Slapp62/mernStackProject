const jwt = require("jsonwebtoken");
const { throwError } = require("../../utils/functionHandlers");
const e = require("express");

const generateAuthToken = (user) => {
  const { _id, isAdmin, isBusiness } = user;
  const token = jwt.sign(
    {
      _id,
      isAdmin,
      isBusiness,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  return token;
};

const verifyAuthToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    return userData;
  } catch (error) {
    throwError(401, error.message);
  }
};

module.exports = {
  generateAuthToken,
  verifyAuthToken,
};
