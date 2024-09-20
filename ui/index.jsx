import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { WebSocketProvider } from './providers/websocket';
import Loader from './Loader';


const App = () => {
    const [componentName, setComponentName] = useState(null);

    useEffect(() => {
        const fetchComponent = async () => {

            if (!window.SERVER) {
                console.warn('SERVER environment variable not set');
                return;
            }

            try {
                const response = await fetch(`http://${window.SERVER}/get-component`);
                const data = await response.json();
                setComponentName(data.component);
            } catch (error) {
                console.error('Error fetching component data:', error);
            }
        };

        fetchComponent();

        const timeoutId = setTimeout(fetchComponent, 5000);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <>
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
            <WebSocketProvider>
                {componentName && <Loader type="ui" component={componentName} />}
            </WebSocketProvider>
        </>
    );
};


const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);