# Project deployment with docker

## Graphql Api
Environment variables for mongo-express

### Setup Graphql Secret for authentication using:
~~~
export MEAN_STORE_SECRET=<SECRET TOKEN HERE>
~~~

### Setup Mongo Connection String
~~~
export MEAN_STORE_DATABASE=<SECRET TOKEN HERE>
~~~

### Setup Graphql Secret for authentication using:
~~~
export MEAN_STORE_NODE_ENV='production'
~~~
### Setup database connection string using:
~~~
export MEAN_STORE_DATABASE='mongodb://user:password@mongodb/mean-store?authSource=admin'
~~~
Due to the network cofnigured in the docker-compose.yml file the host mongodb can be resolved

'production'
## Mongo
Environment variables for mongodb

### Setup Mongo Username:
~~~
export MONGO_INITDB_ROOT_USERNAME=<USERNAME_HERE>
~~~

### Setup Mongo Password using:
~~~
export MONGO_INITDB_ROOT_PASSWORD=<PASSWORD_HERE>
~~~



### To access the mongo shell inside the container use the comand

~~~
docker exec -it mongodb bash
docker exec -it graphql ash
~~~

If environemnt variables are configured access mongo shell directly

~~~
docker exec -it mongodb mongo admin -u $MONGO_INITDB_ROOT_USERNAME -p '$MONGO_INITDB_ROOT_PASSWORD'
~~~