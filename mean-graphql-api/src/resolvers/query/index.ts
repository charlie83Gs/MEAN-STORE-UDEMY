// No type definitions for GMR library
//@ts-ignore
import GMR from '@wiicamp/graphql-merge-resolvers';
import resolversGenreQuery from './genre';
import resolversProductQuery from './product';
import resolversUserQuery from './user';

const queryResolvers = GMR.merge([
    resolversUserQuery,
    resolversProductQuery,
    resolversGenreQuery
])

export default queryResolvers;