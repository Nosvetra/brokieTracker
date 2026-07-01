import express from "express";
import cors from "cors";

import config from "./config/index.js";
import apiRoutes from "./routes/indexRoute.js";

const app = express();

app.use(
  cors({
    origin: config.cors.origin,
    credentials: config.cors.Credentials,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/", apiRoutes);

export default app;
