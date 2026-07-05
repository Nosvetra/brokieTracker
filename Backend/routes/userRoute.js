import express from "express";
import regiterControllr from "../controller/userService.js";

const router = express.Router();

router.post("/register", regiterControllr.registerUser);

export default router;
