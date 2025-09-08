const config = require("config");
const { handleError, throwError } = require("../utils/functionHandlers");
const { verifyAuthToken } = require("../auth/providers/jwt");
const Cards = require("../validation/mongoSchemas/cardsSchema");
const Users = require("../validation/mongoSchemas/usersSchema");
const { verifyPassword } = require("../utils/bcrypt");

const tokenGenerator = config.get("TOKEN_GENERATOR") || "jwt";

const lockoutCheck = async (req, res, next) => {
  const {email} = req.body;

  try {
    const user = await Users.findOne({ email });
    const isPrevTimeout = user.loginTimeout > 0;
    const isLockedOut = Date.now() - user.loginTimeout < 60 * 1000;
  
    if (isPrevTimeout && isLockedOut) {
      throwError(403, "Access denied. You have been locked out.")
    } 
    next();
  } catch (error) {
    handleError(res, error.status, error.message);
  }
}

const verifyCredentials = async (req, res, next) => {
  const {email, password} = req.body;
  const user = await Users.findOne({ email });
  const enteredPassword = password;
  const savedPassword = user.password;
  const isPasswordValid = await verifyPassword(enteredPassword, savedPassword);
  const loginAttempts = user.loginAttempts;

  if (user && !isPasswordValid){  
    user.loginAttempts = loginAttempts + 1;
    await user.save();

    if (user.loginAttempts === 3) {
      user.loginTimeout = Date.now()
      await user.save();
    }
  }

  if (!isPasswordValid || !user) {
    throwError(401, "Invalid email or password.");
  }

  user.loginAttempts = 0;
  user.loginTimeout = 0;
  await user.save();
  req.user = user;
  next();
};

const authenticateUser = (req, res, next) => {
  if (tokenGenerator === "jwt") {
    const token = req.header("x-auth-token");
    if (!token) {
      throw new Error("Access denied. No token provided.");
    }

    try {
      const userData = verifyAuthToken(token);
      if (!userData) {
        throw new Error("Access denied. Invalid token.");
      }

      req.user = userData;
      next();
    } catch (error) {
      handleError(res, 401, error.message);
    }
  }
};

const adminAuth = (req, res, next) => {
  if (!req.user.isAdmin) {
    handleError(res, 403, "Access denied. Admin access only.");
  } else {
    next();
  }
};

const businessAuth = (req, res, next) => {
  if (!req.user.isBusiness) {
    handleError(res, 403, "Access denied. Business user access only.");
  } else {
    next();
  }
};

const userAdminAuth = async (req, res, next) => {
  const requestedUserId = req.params.id;
  if (req.user._id === requestedUserId || req.user.isAdmin) {
    next();
  } else {
    handleError(res, 403, "Access denied. Unauthorized user.");
  }
};

const cardCreatorAuth = (req, res, next) => {
  const cardId = req.params.id;
  try {
    const card = Cards.findById(cardId);
    if (card.user_id !== req.user._id) {
      handleError(res, 403, "Access denied. Unauthorized user.");
    } else {
      next();
    }
  } catch (error) {
    handleError(res, 500, error.message);
  }
}

module.exports = {
  verifyCredentials,
  authenticateUser,
  adminAuth,
  businessAuth,
  userAdminAuth,
  cardCreatorAuth,
  lockoutCheck
};
