import { useEffect, useState } from 'react';
import type { TypeSidebar, TypePage } from "@/types";

let socket: WebSocket | null = null;
let listeners: ((page: TypePage | undefined, sidebar: TypeSidebar | undefined) => void)[] = [];
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
        try {
            const updatedData = JSON.parse(event.data);
            const page: TypePage | undefined = updatedData.page;
            const sidebar: TypeSidebar | undefined = updatedData.sidebar;
            listeners.forEach((cb) => cb(page, sidebar));
        } catch (err) {
            console.error('Failed to parse WebSocket message', err);
        }
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
            }, 3000);
        }
    };
}

export function initializeWebSocket(url: string) {
    if (!socket || socket.readyState === WebSocket.CLOSED) {
        connectWebSocket(url);
    }
}

export function send(key: string, value: object) {
    if (socket && socket.readyState === WebSocket.OPEN) {
        const message = { [key]: value };
        socket.send(JSON.stringify(message));
    } else {
        console.error('WebSocket is not connected');
    }
}

export function subscribe(callback: (page: TypePage | undefined, sidebar: TypeSidebar | undefined) => void) {
    listeners.push(callback);
    return () => {
        listeners = listeners.filter((cb) => cb !== callback);
    };
}

export function useWebSocket() {
    const [page, setPage] = useState<TypePage | undefined>(undefined);
    const [sidebar, setSidebar] = useState<TypeSidebar | undefined>(undefined);

    useEffect(() => {
        if (!window.wsURL) {
            console.error('WebSocket URL is not defined');
            return;
        }

        initializeWebSocket(window.wsURL);

        const unsubscribe = subscribe((p, s) => {
            setPage(p);
            setSidebar(s);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return { page, sidebar, send };
}
