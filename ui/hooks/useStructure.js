/* 
    Extend the useWebsocket hook to include the structure of the data
    - A "nav" that contains the navigation structure
    - A "aside" that contains the aside structure
    - A "main" that contains the main structure
    - A "footer" that contains the footer structure

    Headers and style are injected directly into the index.html
*/

import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useStructure = () => {
    const { socket } = useWebSocket();
    const [nav, setNav] = useState([]);
    const [aside, setAside] = useState([]);
    const [main, setMain] = useState([]);
    const [footer, setFooter] = useState([]);


    useEffect(() => {
        if (!window.SERVER) {
            setMain([])
        }

        if (!socket) return;


        socket.onmessage = (event) => {
            console.log("Message received: ", event.data);
        };

    }, [socket]);


    return { nav, aside, main, footer };
};

export { useStructure };