const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

  try {

    // Get token from headers
    const token =
      req.headers.authorization?.split(" ")[1];

    // If token missing
    if (!token) {

      return res.status(401).json({
        message: "Access Denied",
      });

    }

    // Verify token
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Save user data in request
    req.user = verified;

    next();

  } catch (error) {

    console.log(error);

    res.status(401).json({
      message: "Invalid Token",
    });

  }

};

module.exports = authMiddleware;