import bodyParser from "body-parser";
import { registerUserDto } from "../dto/index.js";

class userService {
  static async registerUser(req, res) {
    console.log(req.body);
    console.log("duh ");
  }
}

export default userService;
