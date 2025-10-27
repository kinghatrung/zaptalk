import { verifyToken } from "../providers/jwtProvider.js";

const authMiddleware = {
  isAuthorized: async (req, res, next) => {
    const accessTokenFromCookie = req.cookies?.accessToken;
    if (!accessTokenFromCookie) {
      res.status(401).json({ message: "Không tìm thấy Token!" });
      return;
    }
    try {
      const accessTokenDecoded = await verifyToken(accessTokenFromCookie, process.env.JWT_ACCESS_TOKEN);
      req.jwtDecoded = accessTokenDecoded;
      next();
    } catch (error) {
      if (error.message?.includes("jwt expired")) return res.status(410).json({ message: "Token expired" });
      res.status(401).json({ message: "Unauthorized" });
    }
  },
};

export default authMiddleware;
