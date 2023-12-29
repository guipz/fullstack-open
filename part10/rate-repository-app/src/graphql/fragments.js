import { gql } from "@apollo/client";

export const REPOSITORY = gql`
  fragment Repository on Repository {
    id
    fullName
    description
    ownerAvatarUrl
    stargazersCount
    reviewCount
    forksCount
    ratingAverage
    language
    url
  }
`;

export const REVIEW = gql`
  fragment Review on Review {
    id
    text
    rating
    createdAt
    user {
      id
      username
    }
  }
`;
