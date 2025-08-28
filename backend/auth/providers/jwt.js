const jwt = require("jsonwebtoken");

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
    throw new Error("Invalid token");
  }
};

module.exports = {
  generateAuthToken,
  verifyAuthToken,
};
