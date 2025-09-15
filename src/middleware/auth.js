//JWT verify middleware + sets req.userId
const jwt = require('jsonwebtoken');

//reads authorization header and checks the token
async function requireUser(req, res, next) {
  try {
    const auth = req.headers.authorization;

    if (!auth) {
      return res.status(401).json({ error: "Authorization header required" });
    }

    const token = auth.split(' ')[1]; // only grab token part
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = requireUser;
