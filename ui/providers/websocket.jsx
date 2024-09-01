import React, { createContext, useContext, useState, useEffect, useRef } from 'react';


const WebSocketContext = createContext();


export const WebSocketProvider = ({ children }) => {
    // The json keeps track of the json of the current page
    const [json, setJson] = useState({});
    const socketRef = useRef(null);

    useEffect(() => {
        const TOKEN = "1234"
        console.log('Connecting to WebSocket...');

        const socket = new WebSocket(`${window.SERVER_URL}?token=${TOKEN}`);
        socketRef.current = socket;

        socket.addEventListener('open', () => {
            socket.send('Hello Server!');
        });

        socket.addEventListener('error', () => {
            console.error('WebSocket error, using fallback data.');
        });

        socket.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            setJson(data.json);
        });

        return () => {
            socket.close();
        };
    }, []);

    const update = ({ id, newData }) => {
        const obj = {}
        obj[id] = newData;
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(obj));
        }
    };

    return (
        <WebSocketContext.Provider value={{ json, update }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};