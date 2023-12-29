import { gql } from "@apollo/client";
import { REPOSITORY, REVIEW } from "./fragments";

export const GET_REPOSITORIES = gql`
  query (
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          ...Repository
        }
      }
    }
  }
  ${REPOSITORY}
`;

export const ME = gql`
  query ($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...Review
            repository {
              name
            }
          }
        }
      }
    }
  }
  ${REVIEW}
`;

export const GET_REPOSITORY = gql`
  query ($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...Repository
    }
  }
  ${REPOSITORY}
`;

export const GET_REVIEWS = gql`
  query ($id: ID!) {
    repository(id: $id) {
      id
      fullName
      reviews {
        edges {
          node {
            ...Review
          }
        }
      }
    }
  }
  ${REVIEW}
`;
