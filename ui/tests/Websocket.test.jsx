import React from 'react';
import { render } from '@testing-library/react';
import WS from 'jest-websocket-mock';
import App from '../app';


describe('WebSockets', () => {
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

    it('Basic - Test the connection', async () => {
        render(<App />);
        await server.connected;
    });

    it('Basic - Test the connection and send a message', async () => {
        render(<App />);
        await server.connected;

        server.send(JSON.stringify({ type: 'ping' }));
        expect(server).toReceiveMessage('ping');
    });
});    