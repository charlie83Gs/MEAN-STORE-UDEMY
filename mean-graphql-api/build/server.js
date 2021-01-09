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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = __importDefault(require("./schema"));
const graphql_playground_middleware_express_1 = __importDefault(require("graphql-playground-middleware-express"));
const environments_1 = __importDefault(require("./config/environments"));
const constants_1 = require("./config/constants");
const database_1 = __importDefault(require("./lib/database"));
if (process.env.MEAN_STORE_NODE_ENV !== 'production') {
    const env = environments_1.default;
    console.log(env);
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = express_1.default();
        const corsOpt = cors_1.default();
        app.use('*', corsOpt);
        const database = new database_1.default();
        const db = yield database.init();
        const context = ({ req, connection }) => __awaiter(this, void 0, void 0, function* () {
            const token = (req) ? req.headers.authorization : connection.authorization;
            return { db, token };
        });
        var graphql_server = new apollo_server_express_1.ApolloServer({
            schema: schema_1.default,
            introspection: true,
            context
        });
        graphql_server.applyMiddleware({ app });
        app.get('/', graphql_playground_middleware_express_1.default({
            endpoint: '/graphql',
        }));
        app.listen({
            port: constants_1.PORT
        }, () => {
            console.log(`API MEANG online shop started running at http://localhost:${constants_1.PORT}/`);
        });
    });
}
init();