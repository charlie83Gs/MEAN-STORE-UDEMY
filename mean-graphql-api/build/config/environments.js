"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
var env_file = fs_1.default.existsSync("./src/.env") ? "./src/.env" : "./src/dummy.env";
const environment = dotenv_1.default.config({ path: env_file });
if (process.env.MEAN_STORE_NODE_ENV !== "production") {
    if (environment.error) {
        throw environment.error;
    }
}
exports.default = environment;
