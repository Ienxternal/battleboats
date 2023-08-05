const Ship = require('./models/Ship');
const User = require('./models/UserModel');

const resolvers = {
  Query: {
    getShips: async () => {
      try {
        const ships = await Ship.find();
        return ships;
      } catch (error) {
        throw new Error('Error fetching ships:', error);
      }
    },
    getUsers: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        throw new Error('Error fetching users:', error);
      }
    },
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      try {
        // Create the user in the database
        const newUser = await User.create({ username, email, password });

        // Return the newly created user
        return newUser;
      } catch (error) {
        throw new Error('Error creating user:', error);
      }
    },
  },
};

module.exports = resolvers;
