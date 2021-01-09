"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_merge_resolvers_1 = __importDefault(require("@wiicamp/graphql-merge-resolvers"));
const product_1 = __importDefault(require("./product"));
const user_1 = __importDefault(require("./user"));
const queryResolvers = graphql_merge_resolvers_1.default.merge([
    user_1.default,
    product_1.default
]);
exports.default = queryResolvers;
