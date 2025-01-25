const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  authenticate: async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        status: false,
        message: "Token tidak disertakan atau format tidak valid",
        data: null,
      });
    }

    const token = authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      console.error("Kesalahan verifikasi token:", error.message);
      return res.status(401).json({
        status: false,
        message: "Token tidak valid",
        data: null,
      });
    }
  },

  authorizeAdmin: (req, res, next) => {
    if (!req.user || req.user.role !== "ADMIN") {
      return res.status(403).json({
        status: false,
        message: "Akses ditolak. Anda bukan admin",
        data: null,
      });
    }
    next();
  },
};
