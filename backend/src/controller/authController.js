import ms from "ms";
import authService from "../services/authService.js";
import Session from "../models/Session.js";

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

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: ms("15 m"),
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
        res.clearCookie("accessToken");
      }
      res.sendStatus(204);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  refreshToken: async (req, res) => {
    try {
      const token = req.cookies?.refreshToken;

      const { accessToken } = await authService.refreshToken(token);

      res.status(200).json({ accessToken });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default authController;
