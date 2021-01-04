import MongoCliente from 'mongodb';

class Database{
    async init(){
        const MONGO_DB = process.env.DATABASE || "mongodb://localhost:27017/mean-store"
        const client = await MongoClient
    }
}