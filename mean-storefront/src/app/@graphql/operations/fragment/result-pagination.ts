import gql  from 'graphql-tag';

export const RESULT_PAGINATION_FRAGMENT = gql`
    fragment ResultPaginationObject on PaginationResult {
        page
        pages
        items
        total
    }
`;