"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = exports.initDb = void 0;
const mongodb_1 = require("mongodb");
let _db = null;
const initDb = async () => {
    if (_db) {
        console.log('Db is already initialized!');
        return _db;
    }
    const client = await mongodb_1.MongoClient.connect(process.env.MONGODB_URI);
    _db = client.db();
    return _db;
};
exports.initDb = initDb;
const getDb = () => {
    if (!_db) {
        throw new Error('Database not initialized');
    }
    return _db;
};
exports.getDb = getDb;
