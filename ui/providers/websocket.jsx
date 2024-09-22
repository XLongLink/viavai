import React, { createContext, useEffect, useState } from 'react';


/* 
    This context wrap the entire application:
    - Ensure that the WebSocket connection is established
    - Make the WebSocket connection available to all the components
*/
const WebSocketContext = createContext();


function WebSocketProvider({ children }) {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const { SERVER, TOKEN } = window;

        if (!window.SERVER) {
            console.warn('SERVER environment variable not set');
            return;
        }

        const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
        const socketUrl = `${protocol}${SERVER}/ws?token=${TOKEN}`;

        // Open the WebSocket connection and store it in the state
        const ws = new WebSocket(socketUrl);
        setSocket(ws);

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.onopen = () => {
            console.log('WebSocket connection established');
        };

        // send back the message to the server
        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log('WebSocket message received:', message);

            // Send a 'ping' message back to the server
            ws.send(JSON.stringify({ type: 'ping' }));
        };

        // Cleanup
        return () => {
            if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
                ws.close();
            }
        };
    }, []);

    return (
        <WebSocketContext.Provider value={{ socket }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export { WebSocketProvider, WebSocketContext };