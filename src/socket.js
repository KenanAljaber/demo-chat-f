import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'https://demo-chat-mm8t.onrender.com:10000';

export const socket = io(URL);