import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    avatar: { type: String, default: null },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true },
);

userSchema.index({ email: 1 });

// userSchema.pre("save", () => {
//   bcrypt.hash(this.passwordHash, 10, async (err, hash) => {
//     if (err) {
//       console.log(`Error hashing password ${err}`);
//     } else {
//       this.passwordHash = hash;
//       console.log(hash);
//     }
//   });
// });

const userSchema = mongoose.model("user", userSchema);
export default userSchema;
