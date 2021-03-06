import { IContext } from './interfaces/context.interface';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import { ApolloServer} from 'apollo-server-express';
import schema from './schema';
import expressPlayground from 'graphql-playground-middleware-express';
import environments from './config/environments';
import {PORT} from './config/constants'
import { Server } from 'http';
import Database from './lib/database';
/*
* ----------------------------------------------------------
* Constants
* ----------------------------------------------------------
*/

if( process.env.MEAN_STORE_NODE_ENV !== 'production'){
    const env = environments;
    console.log(env)
    
}

//initialize sever with specified config
async function init(){

    /*
    * ----------------------------------------------------------
    *  Configure Express server and Middleware
    * ----------------------------------------------------------
    */
    const app = express();
    //cors config
    const corsOpt = cors()
    app.use('*',corsOpt);
    //compress config
    // Currenly not working properly in windows
    // app.use(compression);
    
    //initialize database
    const database = new Database();
    const db = await database.init();
    const context = async({req, connection} : IContext )=> {
        const token = (req) ? req.headers.authorization : connection.authorization;
        return { db , token }
    }
    /*
    * ----------------------------------------------------------
    *  Configure GraphQL Apollo Server and Middleware
    * ----------------------------------------------------------
    */
    var graphql_server = new ApolloServer({
        schema,
        introspection:true,
        context
    });

    graphql_server.applyMiddleware({app})

    /*
    * ----------------------------------------------------------
    *  Routes
    * ----------------------------------------------------------
    */

    app.get('/', expressPlayground({
        endpoint: '/graphql',
    }));

    /*
    * ----------------------------------------------------------
    *  Create server
    * ----------------------------------------------------------
    */

    app.listen(
        {
            port:PORT
        },
        ()=>{
            console.log(`API MEANG online shop started running at http://localhost:${PORT}/`);
        }
    )

}

/*
* ----------------------------------------------------------
* Run the server
* ----------------------------------------------------------
*/

init();