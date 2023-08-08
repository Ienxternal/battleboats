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

  type Game {
    id: ID!
    createdBy: User!
    player1: User!
    player2: User
    status: String!
    ships: [Ship!]!
    currentPlayer: User
    # ... other game fields
  }

  input UserFilter {
    username: String
    email: String
  }

  type Query {
    getShips: [Ship!]!
    getUsers(filter: UserFilter): [User!]!
    allUsers: [User!]!
  }

  type Query {
  getUsers: [User!]!  # List of non-nullable User objects
}

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
    # Add Battleship game mutations here
    startGame(player1: ID!, player2: ID!): Game
    placeShip(gameId: ID!, playerId: ID!, shipId: ID!): Ship
    makeMove(gameId: ID!, row: Int!, col: Int!, playerId: ID!): Game
    # ... other mutations
  }

  type Subscription {
    # Add Battleship game subscription for game updates
    gameUpdated(gameId: ID!): Game
  }
`;

module.exports = { typeDefs };
