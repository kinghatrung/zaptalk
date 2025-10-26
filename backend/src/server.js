import express from "express";
import dotenv from "dotenv";

import { connect } from "./lib/db.js";
import authRoute from "./routes/authRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.use("/api/auth", authRoute);

connect().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
});
