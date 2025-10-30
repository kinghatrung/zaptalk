import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connect } from "./lib/db.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import authMiddleware from "./middlewares/authMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: `${process.env.CLIENT_URL}`,
    credentials: true,
  })
);
// public router
app.use("/api/auth", authRoute);

// private router
app.use(authMiddleware.isAuthorized);
app.use("/api/users", userRoute);

connect().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
});
