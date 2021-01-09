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
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_operations_1 = require("../../lib/db-operations");
const resolversUserMutation = {
    Mutation: {
        register(root, { user }, { db }) {
            return __awaiter(this, void 0, void 0, function* () {
                const userCheck = yield db_operations_1.findOneElement(db, constants_1.COLLECTIONS.USERS, { email: user.email });
                console.log(userCheck);
                if (userCheck != null) {
                    return {
                        status: false,
                        message: constants_1.MESSAGES.REGISTER_USER_EXISTS,
                        user: null
                    };
                }
                user.id = yield db_operations_1.getNewDocumentId(db, constants_1.COLLECTIONS.USERS, { registerDate: -1 });
                user.registerDate = new Date().toISOString();
                user.password = bcrypt_1.default.hashSync(user.password, 10);
                return yield db_operations_1.insertOneElement(db, constants_1.COLLECTIONS.USERS, user).then(() => __awaiter(this, void 0, void 0, function* () {
                    return {
                        status: true,
                        message: constants_1.MESSAGES.REGISTER_SUCCESFUL,
                        user: user
                    };
                })).catch((err) => {
                    console.log(err.message);
                    return {
                        status: false,
                        message: constants_1.MESSAGES.REGISTER_USER_FAILED,
                        user: null
                    };
                });
            });
        }
    }
};
exports.default = resolversUserMutation;
