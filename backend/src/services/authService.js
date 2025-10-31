import bcrypt from "bcrypt";
import crypto from "crypto";

import { generateToken } from "../providers/jwtProvider.js";
import User from "../models/User.js";
import Session from "../models/Session.js";

const ACCESS_TOKEN_TTL = "15s";
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000;

const authService = {
  signUp: async (username, password, email, firstName, lastName) => {
    try {
      if (!username || !password || !email || !firstName || !lastName) {
        throw new Error("Không được để trống các thông tin ");
      }

      const user = await User.findOne({ username });
      if (user) throw new Error("Tên đăng nhập đã tồn tại");

      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        username,
        hashPassword: hashedPassword,
        email,
        displayName: `${lastName} ${firstName} `,
      });

      return;
    } catch (err) {
      throw err;
    }
  },

  signIn: async (username, password) => {
    try {
      if (!username || !password) throw new Error("Không được để trống tên đăng nhập hoặc mật khẩu");
      const user = await User.findOne({ username });
      if (!user) throw new Error("Tài khoản hoặc mật khẩu không chính xác");
      const passwordCorrect = await bcrypt.compare(password, user.hashPassword);
      if (!passwordCorrect) throw new Error("Tài khoản hoặc mật khẩu không chính xác");
      const accessToken = await generateToken({ userId: user._id }, process.env.JWT_TOKEN_SECRET, ACCESS_TOKEN_TTL);
      const refreshToken = crypto.randomBytes(64).toString("hex");

      await Session.create({
        userId: user._id,
        refreshToken,
        expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
      });

      return {
        user,
        accessToken,
        refreshToken,
      };
    } catch (err) {
      throw err;
    }
  },
};

export default authService;
