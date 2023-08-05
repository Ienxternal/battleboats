const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const UserModel = require('./models/UserModel');

const app = express();

// Replace 'your-mongodb-connection-string' with your actual MongoDB connection URL
const mongoDBConnectionString = 'mongodb+srv://user0xdefault:SsXgFCxTSHDRKAz0@cluster0.ltqemr5.mongodb.net/';

mongoose
  .connect(mongoDBConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ UserModel }), // Make UserModel available in the context for resolvers
});

// Await server start before applying middleware
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startServer();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
