import ms from "ms";
import authService from "../services/authService.js";

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

  logout: async (req, res) => {
    try {
      const token = req.cookies?.refreshToken;
      if (token) {
        res.clearCookie("refreshToken");
      }

      res.sendStatus(204);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default authController;
