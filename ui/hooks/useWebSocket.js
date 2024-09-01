import { useState, useEffect, useCallback } from 'react';

const useWebSocket = (url) => {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const ws = new WebSocket(url);

        ws.onopen = () => {
            console.log('WebSocket connected');
            setIsConnected(true);
        };

        ws.onmessage = (event) => {
            console.log('Message from server', event.data);
            setMessage(event.data);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error', error);
        };

        ws.onclose = () => {
            console.log('WebSocket disconnected');
            setIsConnected(false);
        };

        setSocket(ws);

        return () => {
            ws.close();
        };
    }, [url]);

    const sendMessage = useCallback(
        (msg) => {
            if (socket && isConnected) {
                socket.send(msg);
            }
        },
        [socket, isConnected]
    );

    return { message, sendMessage, isConnected };
};

export default useWebSocket;
