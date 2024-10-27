// socketUtil.ts
import io from 'socket.io-client';
import { BACKEND_URL } from '@env';
const socket = io(BACKEND_URL); // Adjust the URL to your server's address
export { socket };
