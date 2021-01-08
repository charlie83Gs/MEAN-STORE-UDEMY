import dotenv from "dotenv";

var environment = dotenv.config({ path: "./src/.env" });

try {
    environment = dotenv.config({
    path: "./src/.env",
  });
} catch (error) {
    environment = dotenv.config({ path: "./src/.env" });
}

if (process.env.MEAN_STORE_NODE_ENV !== "production") {
  if (environment.error) {
    throw environment.error;
  }
}

export default environment;
