const { gql } = require('apollo-server-express');

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
    getUsers: [User!]!
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
  }
`;

module.exports = { typeDefs };
