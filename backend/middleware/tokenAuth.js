const { handleError } = require("../utils/errorHandler");
const { verifyToken } = require("../utils/jwtService");
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('x-auth-token');
  
  if (!token) {
    handleError(res, 401, 'Access denied, no token provided');
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    
    next();
  } catch (error) {
    handleError(res, 400, 'Invalid token');
  }
};

const adminAuth = (req, res, next) => {
  if (!req.user.isAdmin) {
    handleError(res, 403, 'Access denied, admin only');
  } else {
    next();
  }
};

const userAdminAuth = async (req, res, next) => {
  user = await Users.findById(req.user.id);
  if (user || user.isAdmin) {
    next();
  } else {
    handleError(res, 403, 'Access denied, unauthorized user');
  }
}

module.exports = {
  verifyToken,
  adminAuth,
  userAdminAuth
};