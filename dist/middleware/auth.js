"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const auth = (req, res, next) => {
    // Get toke from header
    const token = req.header("x-auth-token");
    // Check if no token
    if (!token) {
        return res.status(401).json({ msg: "No Token! Authorization denied" });
    }
    // Verify the token
    try {
        const decoded = jsonwebtoken_1.verify(token, process.env["jwtSecret"]);
        req.user = decoded.user;
        next();
    }
    catch (err) {
        return res.status(401).json({ msg: "Token Invalid!" });
    }
};
exports.default = auth;
