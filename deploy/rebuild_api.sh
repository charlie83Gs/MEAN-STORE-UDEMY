docker-compose stop mean-store-graphql-api
docker-compose rm -f mean-store-graphql-api
docker-compose build mean-store-graphql-api
docker-compose up -d mean-store-graphql-api