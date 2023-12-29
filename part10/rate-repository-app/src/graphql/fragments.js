import { gql } from "@apollo/client";

export const REPOSITORY = gql`
  fragment Repository on Repository {
    id,
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
