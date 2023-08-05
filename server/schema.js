// schema.js

const { gql } = require('apollo-server-express');

// Define your type definitions using GraphQL schema language (SDL)
const typeDefs = gql`
  type Ship {
    id: ID!
    name: String!
    size: Int!
  }

  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Query {
    getShips: [Ship!]!
    getUsers: [User!]!  # Add the getUsers query here
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
  }
`;

module.exports = typeDefs;
