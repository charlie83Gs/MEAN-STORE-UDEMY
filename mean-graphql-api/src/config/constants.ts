import environment from './environments';

if(process.env.MEAN_STORE_NODE_ENV !== 'production'){
    const env = environment;
}

export const SECRET_KEY = process.env.MEAN_STORE_SECRET || 'p2KRWYvx8SRcrBt8anD4M4Jhd5CLFC6D';
export const PORT = process.env.MEAN_STORE_PORT || 4200;
export const DATABASE = process.env.MEAN_STORE_DATABASE || 'mongodb://localhost:27017/mean-store?authSource=admin';

export enum COLLECTIONS{
    USERS='users',
    GENRES='genres'
}

export enum MESSAGES {
    TOKEN_VERIFICATION_FAILED = 'Token verification failed',
    LOGIN_SUCCESFULL = 'Login succesfull' ,
    LOGIN_FAILED = 'Login Failed, email or password is incorrect',
    REGISTER_USER_EXISTS = 'The specified email is already in use',
    REGISTER_USER_FAILED = 'Unexpected error, failed to register user',
    REGISTER_SUCCESFUL = 'User Registered Succesfully',
}

/**
 * H = Hours
 * M = Minutes
 * D = Days
 */
export enum EXPIRETIME {
    DAY = 24 * 60 * 60,
    HOUR = 60 * 60, 
    MINUTE = 60,

}