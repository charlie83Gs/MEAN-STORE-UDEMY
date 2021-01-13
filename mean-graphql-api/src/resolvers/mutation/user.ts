import { COLLECTIONS, MESSAGES } from '../../config/constants';
import {IResolvers} from 'graphql-tools';
import bcrypt from 'bcrypt';
import { findOneElement, getNewDocumentId, insertOneElement } from '../../lib/db-operations';
import UserService from '../../services/resolvers/user.service';


const resolversUserMutation: IResolvers = {
    Mutation: {
        //--------------------------------------------------------------------------
        // Register User
        //--------------------------------------------------------------------------
        //pass user properties as variables
        async register(_,{user},{ db }) {                    
            var variables = user;
            var context = {db};
            return new UserService(_, variables, context).addItem();
        },
        //pass user properties as variables
        updateUser(_,{user}, context){
            return new UserService(_, user, context).modify();
        },

        deleteUser(_,variables, context){
            return new UserService(_, variables, context).delete();
        }
    }
};

export default resolversUserMutation;