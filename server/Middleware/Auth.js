const jwt = require('jsonwebtoken');

const authMiddleware = {};

authMiddleware.auth = (req, res, next) => {
  try {
    const authToken = req.header('authToken');
    if (!authToken) {
      return res.status(401).json({ message: 'No authentication token, authorization denied' });
    }
    const verifiedToken = jwt.verify(authToken, process.env.JWT_PASSWORD);
    if (!verifiedToken) {
      return res.status(401).json({ message: 'Token verification failed, authorization denied' });
    }
    console.log(verifiedToken);
    req.userId = verifiedToken.id;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports = authMiddleware;
