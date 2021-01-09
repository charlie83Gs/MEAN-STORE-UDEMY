"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXPIRETIME = exports.MESSAGES = exports.COLLECTIONS = exports.DATABASE = exports.PORT = exports.SECRET_KEY = void 0;
const environments_1 = __importDefault(require("./environments"));
if (process.env.MEAN_STORE_NODE_ENV !== 'production') {
    const env = environments_1.default;
}
exports.SECRET_KEY = process.env.MEAN_STORE_SECRET || 'p2KRWYvx8SRcrBt8anD4M4Jhd5CLFC6D';
exports.PORT = process.env.MEAN_STORE_PORT || 4200;
exports.DATABASE = process.env.MEAN_STORE_DATABASE || 'mongodb://localhost:27017/mean-store?authSource=admin';
var COLLECTIONS;
(function (COLLECTIONS) {
    COLLECTIONS["USERS"] = "users";
})(COLLECTIONS = exports.COLLECTIONS || (exports.COLLECTIONS = {}));
var MESSAGES;
(function (MESSAGES) {
    MESSAGES["TOKEN_VERIFICATION_FAILED"] = "Token verification failed";
    MESSAGES["LOGIN_SUCCESFULL"] = "Login succesfull";
    MESSAGES["LOGIN_FAILED"] = "Login Failed, email or password is incorrect";
    MESSAGES["REGISTER_USER_EXISTS"] = "The specified email is already in use";
    MESSAGES["REGISTER_USER_FAILED"] = "Unexpected error, failed to register user";
    MESSAGES["REGISTER_SUCCESFUL"] = "User Registered Succesfully";
})(MESSAGES = exports.MESSAGES || (exports.MESSAGES = {}));
var EXPIRETIME;
(function (EXPIRETIME) {
    EXPIRETIME[EXPIRETIME["DAY"] = 86400] = "DAY";
    EXPIRETIME[EXPIRETIME["HOUR"] = 3600] = "HOUR";
    EXPIRETIME[EXPIRETIME["MINUTE"] = 60] = "MINUTE";
})(EXPIRETIME = exports.EXPIRETIME || (exports.EXPIRETIME = {}));
