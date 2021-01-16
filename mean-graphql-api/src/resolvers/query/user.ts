import {IResolvers} from 'graphql-tools';
import { COLLECTIONS, MESSAGES } from '../../config/constants';
import JWT from '../../lib/jwt';
import bcrypt from 'bcrypt';
import { findManyElements, findOneElement } from '../../lib/db-operations';
import UserService from '../../services/resolvers/user.service';

const resolversUserQuery: IResolvers = {
    Query: {
        //--------------------------------------------------------------------------
        // User query
        //--------------------------------------------------------------------------
        async users(_, variables, context, info) {
            // console.log(root,args,context,info);
            return new UserService(_, {pagination:variables}, context).items();
        },

        async user(_, variables, context, info) {
            // console.log(root,args,context,info);
            return new UserService(_, variables, context).item();
        },
        //--------------------------------------------------------------------------
        // Login query
        //--------------------------------------------------------------------------
        async login(_, variables,context, info){
            return new UserService(_, variables, context).login();
        },

        //--------------------------------------------------------------------------
        // Auth query
        //--------------------------------------------------------------------------
        async auth(_,__,{token, db}){
            return new UserService(_, {token}, {db}).auth();
        }
    }
};

export default resolversUserQuery;