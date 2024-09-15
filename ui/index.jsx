import React, { useState, useEffect, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { WebSocketProvider } from './providers/websocket';
import Loader from './Loader';


const App = () => {
    const [componentName, setComponentName] = useState(null);

    useEffect(() => {
        const fetchComponent = async () => {
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
            <h1 class="text-3xl font-bold underline">
                Hello world!
            </h1>
            <WebSocketProvider>
                {componentName && <Loader type="ui" component={componentName} />}
            </WebSocketProvider>
        </>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));