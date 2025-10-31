import { verifyToken } from "../providers/jwtProvider.js";
import User from "../models/User.js";

const authMiddleware = {
  isAuthorized: async (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (!token) return res.status(401).json({ message: "Unauthorized" });
      const accessTokenDecoded = await verifyToken(token, process.env.JWT_TOKEN_SECRET);
      const user = await User.findById(accessTokenDecoded.userId).select("-hashPassword");
      if (!user) return res.status(404).json({ message: "Người dùng không tồn tại" });
      req.user = user;
      next();
    } catch (error) {
      console.error("Lỗi khi xác minh JWT trong authMiddleware", error);
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Access token hết hạn" });
      }

      res.status(500).json({ message: "Lỗi hệ thống" });
    }
  },
};

export default authMiddleware;
