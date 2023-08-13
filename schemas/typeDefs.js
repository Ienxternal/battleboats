const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Ship {
    _id: ID
    name: String!
    size: Int!
  }

  type Player {
    _id: ID
    userId: Int!
    username: String!
  }

  type Game {
    _id: ID
    player1: Player!
    player2: Player
    player1Ships: [Ship]
    player2Ships: [Ship]
    player1Board: PlayerBoard
    player2Board: PlayerBoard
    currentTurnPlayer: Player
    winner: Player
    status: String
    createdAt: String
  }


  type PlayerBoard {
    rows: [[String]]!
  }

  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
  }

  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    createdAt: String
  }

  type ShotResult {
    status: String!  
    message: String
  }

  type Post {
    _id: ID
    title: String
    content: String
    createdAt: String
  }

  type Subscription {
    postCreated: Post
  }

  type Subscription {
    gameStarted: Game
  }

  type Query {
    getShips: [Ship]!
    thoughts: [Thought]!
    thought(thoughtId: ID!): Thought
    users: [User]!
    user(userId: ID!): User
  }

  input ShipPlacementInput {
    shipId: ID!
    positions: [String]!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): User
    addThought(thoughtText: String!, thoughtAuthor: String!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    addGame(player1Id: ID!, player2Id: ID): Game
    addPlayerShipPlacements(playerId: ID!, shipPlacements: [ShipPlacementInput]!): Player
    startGame(player1Id: ID!, player2Id: ID!): Game
    takeTurn(gameId: ID!, playerId: ID!, shotPosition: [Int!]!): Game
    endGame(gameId: ID!): Game
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
    removePlayerFromGame(gameId: ID!, playerId: ID!): Game
    attemptShot(gameId: ID!, row: Int!, col: Int!): ShotResult
    createPost(author: String, comment: String): Post
  }
`;

module.exports = typeDefs;
