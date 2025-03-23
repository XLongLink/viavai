import { useEffect, useRef, useState } from 'react';
import { State } from '@/types';

declare global {
    interface Window {
        wsURL: string | undefined;
    }
}

export function useWebSocket() {
    const [appState, setAppState] = useState<State | null>(null);
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        if (window.wsURL === undefined) {
            console.error('WebSocket URL is not defined');
            return;
        }
        const socket = new WebSocket(window.wsURL);

        socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        socket.onmessage = (event) => {
            const updatedData = JSON.parse(event.data);
            console.log('WebSocket message received:', updatedData);
            setAppState((prevState) => ({
                ...prevState,
                ...updatedData,
            }));
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        socketRef.current = socket;

        return () => {
            socket.close();
        };
    }, []);

    const setHref = (href: string) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({ href }));
        } else {
            console.error('WebSocket is not connected');
        }
    };

    return { appState, setHref };
}
