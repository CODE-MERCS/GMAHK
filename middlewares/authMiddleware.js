const { verifyToken } = require("../configs/jwt");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = verifyToken(token);
    console.log("Decoded Token:", decoded);

    // Ambil role dari decoded token
    req.user = {
      id: decoded.id.id,
      role: decoded.id.role,
    };

    console.log("User Role:", req.user.role); // Log role untuk debugging
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};



const roleMiddleware = (role) => {
  return (req, res, next) => {
    console.log("Role from Token:", req.user.role); // Log role dari token
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Access forbidden: Insufficient permissions" });
    }
    next();
  };
};



module.exports = { authMiddleware, roleMiddleware };
