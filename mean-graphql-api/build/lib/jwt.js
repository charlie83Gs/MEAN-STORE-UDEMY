"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./../config/constants");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWT {
    constructor() {
        this.secretKey = constants_1.SECRET_KEY;
    }
    sign(data, expiresIn = constants_1.EXPIRETIME.DAY) {
        var newToken = jsonwebtoken_1.default.sign({ user: data.user }, this.secretKey, { expiresIn });
        return newToken;
    }
    verify(token) {
        try {
            var result = jsonwebtoken_1.default.verify(token, this.secretKey);
            return result;
        }
        catch (error) {
            return constants_1.MESSAGES.TOKEN_VERIFICATION_FAILED;
        }
    }
}
exports.default = JWT;
