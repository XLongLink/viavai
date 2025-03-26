import { useEffect, useState } from 'react';
import type { TypeNav, TypePage, TypeMain } from "@/types"

let socket: WebSocket | null = null;
let page: TypePage | undefined = undefined;
let nav: TypeNav | undefined = undefined;
let main: TypeMain | undefined = undefined;

let listeners: ((page: TypePage | undefined, nav: TypeNav | undefined, main: TypeMain | undefined) => void)[] = [];
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
        if (updatedData.page !== undefined) page = updatedData.page;
        if (updatedData.nav !== undefined) nav = updatedData.nav;
        if (updatedData.main !== undefined) main = updatedData.main;
        listeners.forEach((cb) => cb(page, nav, main));
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
    if (socket) return;
    connectWebSocket(url);
}

export function send(key: string, value: object) {
    if (socket && socket.readyState === WebSocket.OPEN) {
        const message = { [key]: value };
        socket.send(JSON.stringify(message));
    } else {
        console.error('WebSocket is not connected');
    }
}

export function subscribe(callback: (page: TypePage | undefined, nav: TypeNav | undefined, main: TypeMain | undefined) => void) {
    listeners.push(callback);
    callback(page, nav, main);

    return () => {
        listeners = listeners.filter((cb) => cb !== callback);
    };
}


export function useWebSocket() {
    const [page, setPage] = useState<TypePage | undefined>(undefined);
    const [nav, setNav] = useState<TypeNav | undefined>(undefined);
    const [main, setMain] = useState<TypeMain | undefined>(undefined);

    useEffect(() => {
        if (!window.wsURL) {
            console.error('WebSocket URL is not defined');
            return;
        }

        initializeWebSocket(window.wsURL);

        const unsubscribe = subscribe((page, nav, main) => {
            setPage(page);
            setNav(nav);
            setMain(main);
        });
        return unsubscribe;
    }, []);

    return { page, nav, main, send };
}
