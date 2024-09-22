import React, { createContext, useMemo, useEffect, useState, useRef } from 'react';


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