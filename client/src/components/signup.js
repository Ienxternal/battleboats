import React, { useState } from 'react';
import { gql, ApolloClient, InMemoryCache } from '@apollo/client';


const GET_USER = gql`
  query GetUser($username: String!) {
    getUsers(filter: { username: $username }) {
      id
      username
      email
    }
  }
`;

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Use the REACT_APP_GRAPHQL_SERVER environment variable
  cache: new InMemoryCache(),
});

const Signup = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit called'); // Log to check if handleSubmit is being called

    try {
      console.log('Mutation variables:', {
        username,
        email,
        password,
      });
      
      const { data } = await client.mutate({
        mutation: gql`
          mutation CreateUser($username: String!, $email: String!, $password: String!) {
            createUser(input: { username: $username, email: $email, password: $password }) {
              id
              username
              email
            }
          }
        `,
        variables: {
          username,
          email,
          password,
        },
      });
      console.log('Mutation data:', data);
      if (data.createUser) {
        // Fetch the newly added user from the GraphQL server
        const { data: userData } = await client.query({
          query: GET_USER,
          variables: { username: username },
        });
  
        const newUser = userData.getUsers[0];
        handleLogin(newUser);
      } else {
        setError('User creation failed.');
      }
    } catch (error) {
      console.error('Error during signup or user query:', error);
      setError('An error occurred. Please try again later.');
    }
  };
  
  
  
  

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
