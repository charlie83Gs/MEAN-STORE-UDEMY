import console from "console";
import dotenv from "dotenv";
import fs from 'fs';

//include a dummy env as the .env file is not included in the repo
var env_file  = fs.existsSync("./src/.env") ? "./src/.env" : "./src/dummy.env";
const environment = dotenv.config({ path: env_file});

if (process.env.MEAN_STORE_NODE_ENV !== "production") {
  if (environment.error) {
    throw environment.error;
  }
}

export default environment;
