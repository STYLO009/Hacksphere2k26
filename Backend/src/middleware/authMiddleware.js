// ======================================
// IMPORT JWT
// ======================================

const jwt = require("jsonwebtoken");

// ======================================
// AUTH MIDDLEWARE
// ======================================

// Protects private routes

exports.isLoggedIn = async (req, res, next) => {
  try {
    let token;

    // ======================================
    // TOKEN FROM AUTH HEADER
    // ======================================

    // Example:
    // Authorization: Bearer TOKEN

    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    // ======================================
    // TOKEN FROM COOKIE
    // ======================================
    else if (req.cookies.token) {
      token = req.cookies.token;
    }

    // ======================================
    // NO TOKEN FOUND
    // ======================================

    if (!token) {
      return res.status(401).json({
        success: false,

        message: "No token found",
      });
    }

    // ======================================
    // VERIFY JWT TOKEN
    // ======================================

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ======================================
    // STORE USER DATA IN REQUEST
    // ======================================

    req.user = decoded;

    // ======================================
    // MOVE TO NEXT MIDDLEWARE/CONTROLLER
    // ======================================

    next();
  } catch (error) {
    // ======================================
    // INVALID TOKEN
    // ======================================

    return res.status(401).json({
      success: false,

      message: "Invalid token",
    });
  }
};
