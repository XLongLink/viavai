import { TypeState } from '@/types';
import { useEffect, useState } from 'react';

let socket: WebSocket | null = null;
let appState: TypeState | null = null;
let listeners: ((state: TypeState) => void)[] = [];
let retryInterval: NodeJS.Timeout | null = null;

declare global {
    interface Window {
        wsURL: string;
    }
}

function connectWebSocket(url: string) {
    socket = new WebSocket(url);

    socket.onopen = () => {
        console.log('WebSocket connection established');
        if (retryInterval) {
            clearInterval(retryInterval);
            retryInterval = null;
        }
    };

    socket.onmessage = (event) => {
        const updatedData = JSON.parse(event.data);
        appState = { ...appState, ...updatedData };
        listeners.forEach((cb) => cb(appState!));
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
        console.log('WebSocket connection closed');
        socket = null;
        if (!retryInterval) {
            retryInterval = setInterval(() => {
                console.log('Attempting to reconnect...');
                initializeWebSocket(url);
            }, 3000); // Retry every 3 seconds
        }
    };
}


export function initializeWebSocket(url: string) {
    if (socket) return;
    connectWebSocket(url);
}

export function sendHref(href: string) {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ href }));
    } else {
        console.error('WebSocket is not connected');
    }
}

export function subscribe(callback: (state: TypeState) => void) {
    listeners.push(callback);
    if (appState) callback(appState);

    return () => {
        listeners = listeners.filter((cb) => cb !== callback);
    };
}


export function useWebSocket() {
    const [appState, setAppState] = useState<TypeState | null>(null);

    useEffect(() => {
        if (!window.wsURL) {
            console.error('WebSocket URL is not defined');
            return;
        }

        initializeWebSocket(window.wsURL);

        const unsubscribe = subscribe(setAppState);
        return unsubscribe;
    }, []);

    return { appState, setHref: sendHref };
}
