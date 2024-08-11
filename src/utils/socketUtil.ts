// socketUtil.ts
import io from 'socket.io-client';

const socket = io('http://192.168.1.7:4000'); // Adjust the URL to your server's address

export { socket };
