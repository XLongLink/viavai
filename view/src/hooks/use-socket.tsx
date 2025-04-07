import { useEffect, useState } from 'react';
import type { TypeSidebar, TypePage } from '@/types';

let socket: WebSocket | null = null;
let listeners: Array<(page?: TypePage, sidebar?: TypeSidebar) => void> = [];

declare global {
    interface Window {
        wsURL: string;
    }
}

function createSocket(url: string) {
    socket = new WebSocket(url);
    console.log('Connecting to WebSocket:', url);

    socket.onopen = () => {
        send("href", { href: "/" });
    };

    socket.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            const { page, sidebar } = data;
            listeners.forEach(cb => cb(page, sidebar));
        } catch (error) {
            console.error('Failed to parse WebSocket message:', error);
        }
    };

    socket.onerror = (error) => console.error('WebSocket error:', error);
    socket.onclose = () => {
        console.log('WebSocket connection closed');
        socket = null;
    };
}

export function initializeWebSocket(url: string) {
    console.log('Initializing WebSocket:', url);
    if (!socket || socket.readyState === WebSocket.CLOSED) {
        createSocket(url);
    }
}

export function send(key: string, value: object) {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ [key]: value }));
    } else {
        console.error('WebSocket is not connected');
    }
}

export function subscribe(callback: (page?: TypePage, sidebar?: TypeSidebar) => void) {
    listeners.push(callback);
    return () => {
        listeners = listeners.filter(cb => cb !== callback);
    };
}

export function useWebSocket() {
    const [page, setPage] = useState<TypePage | undefined>();
    const [sidebar, setSidebar] = useState<TypeSidebar | undefined>();

    useEffect(() => {
        if (!window.wsURL) return;
        initializeWebSocket(window.wsURL);
        const unsubscribe = subscribe((p, s) => {
            setPage(p);
            setSidebar(s);
        });
        return unsubscribe;
    }, []);

    return { page, sidebar, send };
}

// Vite HMR fix: clean up socket on hot module replacement
if (import.meta.hot) {
    import.meta.hot.dispose(() => {
        if (socket) {
            socket.close();
        }
    });
}
