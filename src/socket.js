import {io} from 'socket.io-client';

const url='http://localhost:3001/';
var l=io(url,{autoConnect:false});
export default l;