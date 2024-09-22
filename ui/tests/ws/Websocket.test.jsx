import React from 'react';
import { render } from '@testing-library/react';
import WS from 'jest-websocket-mock';
import App from '../../app';


describe('WebSocketProvider', () => {
    let server;
    const URL = 'localhost:1234';

    // Initialize the mock WebSocket server
    beforeEach(() => {
        window.SERVER = URL;
        server = new WS(`ws://${URL}/ws`);
    });

    // Clean up the mock server after each test
    afterEach(() => {
        WS.clean();
        delete window.SERVER;
    });


    it('establishes a WebSocket connection on mount', async () => {
        render(<App />);

        await server.connected;
    });
});