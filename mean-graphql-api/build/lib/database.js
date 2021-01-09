"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./../config/constants");
const mongodb_1 = __importDefault(require("mongodb"));
const chalk_1 = __importDefault(require("chalk"));
class Database {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const MONGO_DB = constants_1.DATABASE;
            const client = yield mongodb_1.default.connect(MONGO_DB, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            const db = client.db();
            if (client.isConnected()) {
                console.log("==============================DATABASE==============================");
                console.log(`STATUS: ${chalk_1.default.greenBright('Online')}`);
                console.log(`DATABASE: ${chalk_1.default.greenBright(db.databaseName)}`);
                console.log("==============================DATABASE==============================");
            }
            else {
                console.log("==============================DATABASE==============================");
                console.log(`STATUS: ${chalk_1.default.redBright('Offline')}`);
                console.log("==============================DATABASE==============================");
            }
            return db;
        });
    }
}
exports.default = Database;
