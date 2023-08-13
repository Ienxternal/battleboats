import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_SHIPS } from './graphql/queries'; // Define your query

function ShipList() {
  const { loading, error, data } = useQuery(GET_SHIPS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Ships List</h2>
      <ul>
        {data.ships.map(ship => (
          <li key={ship._id}>{ship.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ShipList;
