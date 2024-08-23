// authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyTokenAndRole = (requiredRole) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log("header" + token);
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Check if the user has the required role
      if (decoded.role !== requiredRole) {
        return res.status(403).json({ message: 'Access denied. You do not have the required role.' });
      }

      req.user = decoded;
      next(); // Continue to the route handler
    } catch (err) {
      res.status(400).json({ message: 'Invalid token.' });
    }
  };
};

module.exports = verifyTokenAndRole;
