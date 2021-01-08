import 'graphql-import-node'
import resolvers from '../resolvers'
import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema}  from 'graphql';
import  { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';


// load all graphql files
const typeDefsArray = loadFilesSync(__dirname, { extensions: ['graphql'], recursive : true});
const typeDefs = mergeTypeDefs(typeDefsArray);

const schema:GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers
})

export default schema;
