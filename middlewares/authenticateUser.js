const jwt = require('jsonwebtoken');

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers?.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // The error is coming from the block above
  // so i'm not properly extracting the token from the req headers

  const token = authHeader.split(' ')[1]; // Extract the token

  try {
    const decoded = jwt.verify(token, process.env.JWT); // Verify the token
    req.user = { id: decoded.userId }; // Attach user info to req.user
    next(); // Call the next middleware or route handler
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authenticateUser;
