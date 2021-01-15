import { gql } from '@apollo/client';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    forwardingIds: [ID!]!
  }
`;

export const resolvers = {};
