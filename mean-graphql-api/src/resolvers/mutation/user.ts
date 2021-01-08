import { COLLECTIONS, MESSAGES } from '../../config/constants';
import {IResolvers} from 'graphql-tools';
import bcrypt from 'bcrypt';
import { findOneElement, getNewDocumentId, insertOneElement } from '../../lib/db-operations';


const resolversUserMutation: IResolvers = {
    Mutation: {
        //--------------------------------------------------------------------------
        // Register User
        //--------------------------------------------------------------------------
        async register(root,{user},{ db }) {
            //check if user exists
            const userCheck = await findOneElement(db,COLLECTIONS.USERS, {email:user.email});
            console.log(userCheck)
            if(userCheck != null){
                return  {
                            status: false,
                            message: MESSAGES.REGISTER_USER_EXISTS,
                            user: null
                        }
            }                        

            //get las registered user name
            user.id = await getNewDocumentId(db,COLLECTIONS.USERS, {registerDate : -1});

            // Asign current date in ISO format into the registerDate field
            user.registerDate = new Date().toISOString();
            //encrypt password
            user.password = bcrypt.hashSync(user.password, 10);
            // console.log(user.registerDate)
            // Save the document in the database
         
            return await insertOneElement(db,COLLECTIONS.USERS, user).then(
                                async () => {
                                    return {
                                        status: true,
                                        message: MESSAGES.REGISTER_SUCCESFUL,
                                        user: user
                                    }
                                }

                            ).catch(
                                (err:Error) => {
                                    console.log(err.message);
                                    return {
                                        status: false,
                                        message: MESSAGES.REGISTER_USER_FAILED,
                                        user: null
                                    }
                                }
                            )
        }
    }
};

export default resolversUserMutation;