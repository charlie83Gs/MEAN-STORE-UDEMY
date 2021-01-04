import dotenv from 'dotenv';

const environment = dotenv.config(
    {
        path:"./src/.env"
    }
)

if( process.env.MEAN_STORE_NODE_ENV !== 'production'){
    if(environment.error){
        throw environment.error;
    }
}

export default environment;