import ms from "ms";
import authService from "../services/authService.js";
import Session from "../models/Session.js";
import { generateToken } from "../providers/jwtProvider.js";

const authController = {
  signUp: async (req, res) => {
    try {
      const { username, password, email, firstName, lastName } = req.body;
      await authService.signUp(username, password, email, firstName, lastName);

      res.sendStatus(204);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  signIn: async (req, res) => {
    try {
      const { username, password } = req.body;
      const { user, accessToken, refreshToken } = await authService.signIn(username, password);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: ms("14 days"),
      });

      res.status(200).json({ message: `Người dùng ${user.displayName} đăng nhập thành công`, accessToken });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  signOut: async (req, res) => {
    try {
      const refreshTokenFromCookies = req.cookies?.refreshToken;
      if (refreshTokenFromCookies) {
        await Session.deleteOne({ refreshToken: refreshTokenFromCookies });
        res.clearCookie("refreshToken");
      }
      res.sendStatus(204);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  refreshToken: async (req, res) => {
    try {
      const token = req.cookies?.refreshToken;

      if (!token) return res.status(401).json({ message: "Không tìm thấy token" });

      const session = await Session.findOne({ refreshToken: token });

      if (!session) return res.status(403).json({ message: "Token không hợp lệ." });
      if (session.expiresAt < new Date()) return res.status(403).json({ message: "Token đã hết hạn." });
      const accessToken = generateToken({ userId: session.userId }, process.env.JWT_TOKEN_SECRET, "15s");

      res.status(200).json({ accessToken });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default authController;
