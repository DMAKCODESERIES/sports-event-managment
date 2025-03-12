import jwt from "jsonwebtoken";
import User from '../models/user.model.js'
export const authenticateUser = async(req, res, next) => {
    // Extract token from headers
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        req.user = decoded; // Attach user info to request object
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
};

// Middleware for role-based access control
export const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden: Access denied" });
        }
        next();
    };
};