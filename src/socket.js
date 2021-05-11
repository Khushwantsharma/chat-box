import { io } from 'socket.io-client';
  const Socket= io('https://hgchat.herokuapp.com/',{
      autoConnect:false
  });
export default Socket;