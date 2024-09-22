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


function Dynamic({ children }) {

    if (children === undefined) return null;

    console.log("Children: ", children);

    return (
        <>
            {
                children.map((child, index) => {
                    const uid = Object.keys(child)[0];
                    const props = child[uid];

                    console.log("UID: ", uid);
                    console.log("Props: ", props);
                    if (props.children) {
                        return <Dynamic key={index}>{props.children}</Dynamic>;
                    }

                    return (<Loader key={index} uid={uid} props={props} />);
                })
            }
        </>
    )
}


/* 
    Structure class
*/
function Structure() {
    const { nav, aside, main, footer } = useStructure();

    const test = [
        {
            "vHLayout": {
                "children": [
                    {
                        "vButton": {
                            "text": "this is a text"
                        }
                    }
                ]
            }
        },

    ]

    return (
        <>
            {nav.length > 0 && <nav />}
            {aside.length > 0 && <aside />}
            {main.length > 0 && <main />}
            {footer.length > 0 && <footer />}

            <Dynamic>{test}</Dynamic>
        </>
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