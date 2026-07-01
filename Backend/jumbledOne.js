import express from "express";
import mongoose from "mongoose";
import env from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import { UNSAFE_createClientRoutesWithHMRRevalidationOptOut } from "react-router-dom";

env.config();
const app = express();
const port = process.env.PORT;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.PG_ADDS)
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log("MongoDb err", err));

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("user", userSchema);

app.post("/register", async (req, res) => {
  const formDetail = req.body;
  if (formDetail.password != formDetail.confirmPass) {
    return res.status(400).json({
      success: false,
      message: "pass does not match",
    });
  }

  try {
    const newRegisteredUser = await User.create({
      email: formDetail.email,
      password: formDetail.password,
    });
    console.log(newRegisteredUser);
    return res.status(201).json({
      success: true,
      message: "user Registered Successfully",
    });
  } catch (err) {
    console.log("Error while adding details", err);
  }
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res.status(401).json({ success: false, message: info?.message });

    req.logIn(user, (err) => {
      if (err) return next(err);
      const { password, ...safeUser } = user.toObject();
      res.status(200).json({ success: true, user: safeUser });
    });
  })(req, res, next); // <-- invoke with (req, res, next)
});

passport.use(
  new Strategy({ usernameField: "email" }, async (email, password, cb) => {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return cb(null, false, { message: "User Not Found" });
    }
    if (validUser.password !== password) {
      return cb(null, false, { message: "Incorrect Password" });
    }
    return cb(null, validUser);
  }),
);
passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
