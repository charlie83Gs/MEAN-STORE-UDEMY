import environment from './environments';

if(process.env.MEAN_STORE_NODE_ENV !== 'production'){
    const env = environment;
}

export const SECRET_KEY = process.env.MEAN_STORE_SECRET || "p2KRWYvx8SRcrBt8anD4M4Jhd5CLFC6D";
export const PORT = process.env.MEAN_STORE_PORT || 4200;