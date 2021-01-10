import {IResolvers} from 'graphql-tools';
import { COLLECTIONS, MESSAGES } from '../../config/constants';
import JWT from '../../lib/jwt';
import bcrypt from 'bcrypt';
import { findManyElements, findOneElement } from '../../lib/db-operations';

const resolversUserQuery: IResolvers = {
    Query: {
        //--------------------------------------------------------------------------
        // User query
        //--------------------------------------------------------------------------
        async users(_, __, {db}, info) {
            // console.log(root,args,context,info);
            try {
                var users = await findManyElements(db,COLLECTIONS.USERS);
                return {
                    "status": true,
                    "message": "User list loaded succesfully",
                    "users": users
                };
            } catch (error) {
                console.log(error)
                return {
                    "status": true,
                    "message": "Error loading users",
                    "users": []
                };
            }
            
            
        },
        //--------------------------------------------------------------------------
        // Login query
        //--------------------------------------------------------------------------
        async login(_, {email,password},{db}, info){
            try {
                var user = await findOneElement(db,COLLECTIONS.USERS, {email});
                if(!user){
                    return {
                        "status": false,
                        "message": MESSAGES.LOGIN_FAILED,
                        "token": null
                    };
                }
                // var verified = password === user.password;
                var verified = bcrypt.compareSync(password,user.password);
                //remove password from token and other PII
                delete user.password;
                delete user.birthday;
                delete user.registerDate;

                var token = new JWT().sign({user});
                return {
                    "status": true,
                    "message": verified? MESSAGES.LOGIN_SUCCESFULL: MESSAGES.LOGIN_FAILED,
                    "token": verified? token : null,
                    user
                };

            } catch (error) {
                console.log(error)
                return {
                    "status": true,
                    "message": "Login Failed",
                    "user": null
                };
            }
        },

        //--------------------------------------------------------------------------
        // Auth query
        //--------------------------------------------------------------------------
        async auth(_,__,{token}){
            console.log(token)
            let info = new JWT().verify(token);

            if(info === MESSAGES.TOKEN_VERIFICATION_FAILED){
                return {
                    status: false,
                    message: info
                }
            }

            return {
                status: true,
                message: "User authenticated correctly using jwt token",
                user: Object.values(info)[0]
            }
        }
    }
};

export default resolversUserQuery;