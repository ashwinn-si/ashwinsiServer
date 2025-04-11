require("dotenv").config();
const jwt = require("jsonwebtoken");

const authRequest = (req, res, next) => {
    const token = req.cookies.jwtToken; // 👈 Get token from HTTP-only cookie

    if (!token) {
        return res
            .status(401)
            .json({ message: "Unauthorized: No token found" });
    }

    try {
        const result = jwt.verify(token, process.env.JWT_TOKEN);
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

module.exports = authRequest;
