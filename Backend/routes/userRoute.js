import express from "express";

const router = express.Router();

router.post("/register", (req, res) => {
  res.json({ message: "this is coming from the /user route" });
  console.log(req.body);
});

export default router;
