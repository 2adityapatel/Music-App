const JWT = require("jsonwebtoken")

const secret = process.env.JWT_SECRET;

function createTokenForUser(user) {
    const payload = {
      _id: user._id,
      email: user.email,
      role: user.role,
    };
    const token = JWT.sign(payload, secret,{ expiresIn: '1h' });
    return token;
  }
  
  function validateToken(token) {
    try {
      const payload = JWT.verify(token, secret);
      return payload;
    } catch (err) {
      // Handle errors, such as token expiration
      throw new Error('Invalid or expired token');
    }
  }
  
  module.exports = {
    createTokenForUser,
    validateToken,
  };
  