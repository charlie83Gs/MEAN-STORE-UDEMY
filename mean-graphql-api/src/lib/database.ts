import { DATABASE } from './../config/constants';
import MongoClient from 'mongodb';
import chalk from 'chalk';

class Database{
    async init(){
        const MONGO_DB = DATABASE;
        const client = await MongoClient.connect(
            MONGO_DB,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );

        const db = client.db();

        if(client.isConnected()){
            console.log("==============================DATABASE==============================")
            console.log(`STATUS: ${chalk.greenBright('Online')}`)
            console.log(`DATABASE: ${chalk.greenBright(db.databaseName)}`)
            console.log("==============================DATABASE==============================")
        }else{
            console.log("==============================DATABASE==============================")
            console.log(`STATUS: ${chalk.redBright('Offline')}`)
            console.log("==============================DATABASE==============================")
        }

        return db;
    }
}

export default Database;