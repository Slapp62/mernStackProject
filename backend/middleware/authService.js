const config = require("config");
const { handleError } = require("../utils/functionHandlers");
const { verifyAuthToken } = require("../auth/providers/jwt");
const Cards = require("../validation/mongoSchemas/cardsSchema");

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
  authenticateUser,
  adminAuth,
  businessAuth,
  userAdminAuth,
  cardCreatorAuth
};
