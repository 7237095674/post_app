const ErrorResponse = require('../utils/ErrorResponse');
const jwt = require('jsonwebtoken');
 const User = require('../models/userModel');


 // check is user is authenticated
 exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  // Make sure the token exists
  if (!token) {
    return next(new ErrorResponse('You must log in...', 401));
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorResponse('You must log in', 401));
  }
};

//middleware for admin
exports.isAdmin = (req, res, next) => {
  if (req.user.role === 'user') {
      return next(new Error('Access denied, you must be an admin', 401));
  }
  next();
};