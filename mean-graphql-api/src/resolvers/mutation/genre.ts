import {IResolvers} from 'graphql-tools';
import { findOneElement, getNewDocumentId, insertOneElement } from '../../lib/db-operations';
import GenreSerivce from '../../services/resolvers/genre.service';


const resolversGenreMutation: IResolvers = {
    Mutation: {
        addGenre(_,variables, context){
            return new GenreSerivce(_, variables, context).addItem();
        },

        updateGenre(_,variables, context){
            return new GenreSerivce(_, variables, context).modify();
        },

        deleteGenre(_,variables, context){
            return new GenreSerivce(_, variables, context).delete();
        }
    }
};

export default resolversGenreMutation;
