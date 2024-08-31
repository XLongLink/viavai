import React, { useState, useEffect, useRef } from 'react';

const Dynamic = ({ componentName }) => {
    const [Component, setComponent] = useState(null);
    const scriptLoadedRef = useRef(false);

    useEffect(() => {
        const loadComponentScript = () => {
            if (!scriptLoadedRef.current) {
                const scriptPath = `.dist/${componentName}.js`;
                console.log(`Loading script: ${scriptPath}`);

                // Dynamically load the script
                const script = document.createElement('script');
                script.src = scriptPath;
                script.async = true;

                script.onload = () => {
                    const LoadedComponent = window[componentName];
                    setComponent(() => LoadedComponent);
                    scriptLoadedRef.current = true;
                };

                script.onerror = () => {
                    console.error(`Error loading script: ${scriptPath}`);
                };

                document.body.appendChild(script);
            }
        };

        loadComponentScript();
    }, [componentName]);

    if (!Component) {
        return <p>Loading component...</p>;
    }

    return <Component />;
};

export default Dynamic;