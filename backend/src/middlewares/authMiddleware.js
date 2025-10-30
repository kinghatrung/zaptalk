import { verifyToken } from "../providers/jwtProvider.js";
import User from "../models/User.js";

const authMiddleware = {
  isAuthorized: async (req, res, next) => {
    const accessTokenFromCookies = req.cookies?.accessToken;
    if (!accessTokenFromCookies) {
      res.status(401).json({ message: "Không tìm thấy Token!" });
      return;
    }
    try {
      const accessTokenDecoded = await verifyToken(accessTokenFromCookies, process.env.JWT_TOKEN_SECRET);
      const user = await User.findById(accessTokenDecoded.user._id).select("-hashPassword");

      req.jwtDecoded = accessTokenDecoded;
      req.user = user;

      next();
    } catch (error) {
      if (error.message?.includes("jwt expired")) return res.status(410).json({ message: "Token expired" });
      res.status(401).json({ message: "Unauthorized" });
    }
  },
};

export default authMiddleware;
