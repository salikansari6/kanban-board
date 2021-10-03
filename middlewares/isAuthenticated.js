const jwt = require("jsonwebtoken");

module.exports.isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({
      message: "Unauthorized Access",
    });
    return;
  }

  console.log("Getting token " + token);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  console.log(decoded.id);
  if (decoded) {
    //Creating req.user object for mobile as it doesn't  have cookies
    if (!req.user) {
      req.user = {};
    }

    req.user._id = decoded.id;
    next();
  } else {
    res.status(401).json({
      message: "Unauthorized Access",
    });
  }
};
