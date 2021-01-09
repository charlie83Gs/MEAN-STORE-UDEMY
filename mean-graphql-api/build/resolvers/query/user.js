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
const constants_1 = require("../../config/constants");
const jwt_1 = __importDefault(require("../../lib/jwt"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_operations_1 = require("../../lib/db-operations");
const resolversUserQuery = {
    Query: {
        users(_, __, { db }, info) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    var users = yield db_operations_1.findManyElements(db, constants_1.COLLECTIONS.USERS);
                    return {
                        "status": true,
                        "message": "User list loaded succesfully",
                        "users": users
                    };
                }
                catch (error) {
                    console.log(error);
                    return {
                        "status": true,
                        "message": "Error loading users",
                        "users": []
                    };
                }
            });
        },
        login(_, { email, password }, { db }, info) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    var user = yield db_operations_1.findOneElement(db, constants_1.COLLECTIONS.USERS, { email });
                    if (!user) {
                        return {
                            "status": false,
                            "message": constants_1.MESSAGES.LOGIN_FAILED,
                            "token": null
                        };
                    }
                    var verified = bcrypt_1.default.compareSync(password, user.password);
                    delete user.password;
                    delete user.birthday;
                    delete user.registerDate;
                    var token = new jwt_1.default().sign({ user });
                    return {
                        "status": true,
                        "message": verified ? constants_1.MESSAGES.LOGIN_SUCCESFULL : constants_1.MESSAGES.LOGIN_FAILED,
                        "token": verified ? token : null
                    };
                }
                catch (error) {
                    console.log(error);
                    return {
                        "status": true,
                        "message": "Login Failed",
                        "user": null
                    };
                }
            });
        },
        auth(_, __, { token }) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log(token);
                let info = new jwt_1.default().verify(token);
                if (info === constants_1.MESSAGES.TOKEN_VERIFICATION_FAILED) {
                    return {
                        status: false,
                        message: info
                    };
                }
                return {
                    status: true,
                    message: "User authenticated correctly using jwt token",
                    user: Object.values(info)[0]
                };
            });
        }
    }
};
exports.default = resolversUserQuery;
