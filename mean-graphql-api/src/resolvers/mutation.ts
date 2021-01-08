import { COLLECTIONS, MESSAGES } from './../config/constants';
import {IResolvers} from 'graphql-tools';
import bcrypt from 'bcrypt';


const resolversMutation: IResolvers = {
    Mutation: {
        //--------------------------------------------------------------------------
        // Register User
        //--------------------------------------------------------------------------
        async register(root,{user},{ db }) {
            //check if user exists
            const userCheck = await db.collection(COLLECTIONS.USERS)
                                        .findOne({email:user.email});

            if(userCheck != null){
                return  {
                            status: false,
                            message: MESSAGES.REGISTER_USER_EXISTS,
                            user: null
                        }
            }                        

            //get las registered user name
            const lastUser = await db.collection(COLLECTIONS.USERS)
                                    .find()
                                    .limit(1)
                                    .sort({registerDate: -1})
                                    .toArray();
            if(lastUser.length <= 0){
                user.id = 1
            }else{
                user.id = lastUser[0].id + 1; 
            }
            // Asign current date in ISO format into the registerDate field
            user.registerDate = new Date().toISOString();
            //encrypt password
            user.password = bcrypt.hashSync(user.password, 10);
            // console.log(user.registerDate)
            // Save the document in the database
            return await db.collection(COLLECTIONS.USERS)
                            .insertOne(user).then(
                                async () => {
                                    return {
                                        status: true,
                                        message: MESSAGES.REGISTER_USER_EXISTS,
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

export default resolversMutation;