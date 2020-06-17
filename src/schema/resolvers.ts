import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    forwardingIds: [ID!]!
  }
`;

export const resolvers = {};
