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
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertManyElement = exports.insertOneElement = exports.findManyElements = exports.findOneElement = exports.getNewDocumentId = void 0;
const getNewDocumentId = (db, collection, sort = { registerDate: -1 }) => __awaiter(void 0, void 0, void 0, function* () {
    const lastElement = yield db
        .collection(collection)
        .find()
        .limit(1)
        .sort(sort)
        .toArray();
    if (lastElement.length <= 0) {
        return 1;
    }
    return lastElement[0].id + 1;
});
exports.getNewDocumentId = getNewDocumentId;
const findOneElement = (db, collection, filter) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db.collection(collection).findOne(filter);
});
exports.findOneElement = findOneElement;
const findManyElements = (db, collection, filter = {}) => __awaiter(void 0, void 0, void 0, function* () {
    return yield yield db.collection(collection).find(filter).toArray();
});
exports.findManyElements = findManyElements;
const insertOneElement = (db, collection, document) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db.collection(collection).insertOne(document);
});
exports.insertOneElement = insertOneElement;
const insertManyElement = (db, collection, documents) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db.collection(collection).insertMany(documents);
});
exports.insertManyElement = insertManyElement;
