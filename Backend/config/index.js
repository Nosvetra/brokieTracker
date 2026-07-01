import env from "dotenv";
env.config();

const config = {
  port: process.env.PORT || 3000,
  mongodb: {
    uri: process.env.MONGODB_CONNECT_URI,
  },

  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    Credentials: true,
  },
};
export default config;
