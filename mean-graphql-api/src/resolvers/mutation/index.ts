// No type definitions for GMR library
//@ts-ignore
import GMR from '@wiicamp/graphql-merge-resolvers';
import resolversUserMutation from './user';

const mutationResolvers = GMR.merge([
    resolversUserMutation
])

export default mutationResolvers;