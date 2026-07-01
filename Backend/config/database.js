import mongoose from "mongoose";

class dataBaseConfig {
  static async connect() {
    try {
      const mongoUrl = process.env.MONGODB_CONNECT_URI;
      if (!mongoUrl)
        throw new Error("MongoDB connection uri is not defined in the env");
      const options = {
        maxPoolSize: 10, // maintain upto 10 socket connections
        serverSelectionTimeoutMS: 5000, // keep trying to send operations for 5 seconds
        socketTimeOutMS: 45000, // Close sockets after 45 seconds of inactivity
      };
      await mongoose.connect(mongoUrl, options);
      console.log("database Connected");
    } catch (err) {
      console.log("Failed to communicate with the database", err);
    }
  }

  static async disconnect() {
    try {
      await mongoose.disconnect();
      console.log("Mongoose got disconnected");
    } catch (err) {
      console.error("Error disconnecting from MongoDb", Error);
    }
  }
}

export default dataBaseConfig;
