import {IResolvers} from 'graphql-tools';
import GenreSerivce from '../../services/resolvers/genre.service';


const resolversGenreQuery: IResolvers = {
    Query: {
      async genres(_, variables, {db}) {
        return new GenreSerivce(_, {pagination:variables}, {db}).items();
      },
      async genre(_, {id}, {db}) {
        return new GenreSerivce(_, {id}, {db}).item();
      },

    }
};

export default resolversGenreQuery;