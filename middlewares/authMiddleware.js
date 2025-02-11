const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token.' });

    if (decoded.role !== "superadmin" && decoded.role !== "business") {
      return res.status(403).json({ message: "Forbidden credentials" });
    }

    next();
  });
};
