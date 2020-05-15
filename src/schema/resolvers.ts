import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    forwardingIds: [ID!]!
    forwardUrls: [String!]
  }
`;

export const resolvers = {};
