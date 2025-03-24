import jwt from "jsonwebtoken";

// Middleware to verify token
export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ success: false, message: "Invalid token" });
    }
};

// Middleware to check if user is Admin
export const isAdmin = (req, res, next) => {
    console.log(req);
    
    if (req.user.role !== "admin") {
        return res.status(403).json({ success: false, message: "Access denied, Admins only" });
    }
    next();
};
