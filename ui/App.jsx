import React, { useMemo } from 'react';
import { WebSocketProvider } from './providers/websocket';
import { useComponent } from './hooks/useComponents';
import { useStructure } from './hooks/useStructure';

import test from "../tests/example.json";

/* 
    Generic component loader:
    - Load the right component based on the uid
    - Pass the props to the component
    - Memoize the entire rendered output
*/
function Loader({ uid, children, props }) {
    const Component = useComponent(uid);

    // Memoize the entire rendered output
    const renderedComponent = useMemo(() => {
        if (!Component) return null;

        return <Component {...props} >{children}</Component>;
    }, [Component, props]);

    return renderedComponent;
};


function Dynamic({ children }) {

    if (!children || !Array.isArray(children)) return null;

    return (
        <>
            {children.map((child, index) => {
                const uid = Object.keys(child)[0];
                const props = child[uid];

                const { children: nestedChildren, ...rest } = props;

                return (
                    <Loader key={index} uid={uid} props={rest}>
                        {nestedChildren && (
                            <Dynamic>{nestedChildren}</Dynamic>
                        )}
                    </Loader>
                );
            })}
        </>
    )
}


/* 
    Structure class
*/
function Structure() {
    const { nav, aside, main, footer } = useStructure();

    return (
        <div className='flex m-1'>
            {nav.length > 0 && <nav />}
            {aside.length > 0 && <aside />}
            {main.length > 0 && <main />}
            {footer.length > 0 && <footer />}

            <Dynamic>{main}</Dynamic>
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