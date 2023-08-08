// src/components/Game.js (or other relevant components)
import React, { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io(); // Initialize the socket instance

// Sending an event to the server
socket.emit('eventName', data);

// Listening for events from the server
socket.on('eventName', (data) => {
  // Handle the received data
});
