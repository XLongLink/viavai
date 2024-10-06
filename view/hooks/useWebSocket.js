import { useContext } from 'react';
import { WebSocketContext } from '../providers/websocket';

/* 
    Handle the connection to the WebSocket server
*/
function useWebSocket() {
    return useContext(WebSocketContext);
};

export { useWebSocket };