import app from "./app.js";
import config from "./config/index.js";
import dataBaseConfig from "./config/database.js";

async function startServer() {
  try {
    await dataBaseConfig.connect();
    app.listen(config.port, () => {
      console.log(`Server running on ${config.port}`);
    });
  } catch (err) {
    console.error("failed to start server", err);
  }
}
startServer();
