import jwt from 'jsonwebtoken';

export const isAuthenticated = async (req, res, next) => {

    console.log("Cookies =>", req.cookies);
    console.log("Token =>", req.cookies.token);
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized, token is missing", success: false });
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: " invalid token", success: false });
        }
        req.id = decoded.userId;
        next();
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}