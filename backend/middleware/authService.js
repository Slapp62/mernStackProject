const config = require("config");
const { handleError } = require("../utils/errorHandler");
const { verifyAuthToken } = require("../auth/providers/jwt");

const tokenGenerator = config.get("TOKEN_GENERATOR") || "jwt";

const authenticateUser = (req, res, next) => {
  if (tokenGenerator === "jwt") {
    const token = req.header("x-auth-token");
    if (!token) {
      throw new Error("Access denied, No token provided.");
    }

    try {
      const userData = verifyAuthToken(token);
      if (!userData) {
        throw new Error("Access denied, Invalid token.");
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

const userAdminAuth = async (req, res, next) => {
  const requestedUserId = req.params.id;
  if (req.user._id === requestedUserId || req.user.isAdmin) {
    next();
  } else {
    handleError(res, 403, "Access denied. Unauthorized user.");
  }
};

module.exports = {
  authenticateUser,
  adminAuth,
  userAdminAuth,
};
