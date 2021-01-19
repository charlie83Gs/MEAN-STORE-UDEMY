
import gql from 'graphql-tag';
import { GENRE_FRAGMENT } from '../fragment/genre';
import { RESULT_PAGINATION_FRAGMENT } from '../fragment/result-pagination';

export const GENRE_LIST_QUERY = gql`
query genresList($page : Int!, $items: Int!){
  genres(page:$page, items: $items){
    message
    status
    pagination{
      ...ResultPaginationObject
    }
    genres{
      ...GenreObject
    }
  }
}
${ GENRE_FRAGMENT }
${ RESULT_PAGINATION_FRAGMENT }
`;