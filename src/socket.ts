import { io } from 'socket.io-client';

export const  socket = io('http://localhost:3000');

socket.on('new_comment', (d) => {
  console.log('d', d)
})