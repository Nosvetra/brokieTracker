import express from "express";

import userRoute from "./userRoute.js";
import toolBoxRoute from "./toolboxRoute.js";
const router = express.Router();

router.use("/", toolBoxRoute);
router.use("/user", userRoute);

export default router;
