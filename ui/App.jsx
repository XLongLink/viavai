import React, { useMemo } from 'react';
import { WebSocketProvider } from './providers/websocket';
import { useComponent } from './hooks/useComponents';
import { useStructure } from './hooks/useStructure';

/* 
    Generic component loader:
    - Load the right component based on the uid
    - Pass the props to the component
    - Memoize the entire rendered output
*/
function Loader({ uid, props }) {
    const Component = useComponent(uid);

    // Memoize the entire rendered output
    const renderedComponent = useMemo(() => {
        if (!Component) return null;

        return <Component {...props} />;
    }, [Component, props]);

    return renderedComponent;
};



/* 
    Structure class
*/
function Structure() {
    const { nav, aside, main, footer } = useStructure();

    // {componentName && <Loader type="ui" component={componentName} />}

    return (
        <div>
            {nav && <nav />}
            {aside && <aside />}
            {main && <main />}
            {footer && <footer />}
        </div>
    );
}


/* 
    Main app
*/
function App() {
    return (
        <WebSocketProvider>
            <Structure />
        </WebSocketProvider>
    );
};


export default App;