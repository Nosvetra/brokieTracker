import express from "express";

const router = express.Router();

router.get("", (req, res) => {
  res.json({ message: "this is the routes" });
});

export default router;
