# Project deployment with docker


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

## Mongo-Express
Environment variables for mongo-express

### Set Mongo-Express Admin to true if you wish to modify db using interface
~~~
export ME_CONFIG_MONGODB_ENABLE_ADMIN=true
~~~

### Setup Mongo-Express Username:
~~~
export MONGO_INITDB_ROOT_USERNAME=<USERNAME_HERE>
~~~

### Setup Mongo-Express Password using:
~~~
export MONGO_INITDB_ROOT_PASSWORD=<PASSWORD_HERE>
~~~


### To access the mongo shell inside the container use the comand

~~~
docker exec -it mongodb bash
~~~

If environemnt variables are configured access mongo shell directly

~~~
docker exec -it mongodb mongo admin -u $MONGO_INITDB_ROOT_USERNAME -p '$MONGO_INITDB_ROOT_PASSWORD'
~~~