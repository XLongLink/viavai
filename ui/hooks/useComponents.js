import { useState, useEffect, useCallback } from 'react';


/* 
    Handle the loading of components:
    - Ensure that the script is only loaded once
    - Prevent the script from loading twince at the same time

    Each component has an unique id
*/


const globalLoader = {};

const useComponent = (uid) => {
    const [Component, setComponent] = useState(null);

    const loadComponentScript = useCallback(() => {
        if (window[uid]) {
            setComponent(() => window[uid]);
            return;
        }

        // Check if the script is already loading
        if (globalLoader[uid]) {
            globalLoader[uid].then((LoadedComponent) => {
                setComponent(() => LoadedComponent);
            });
            return;
        }

        const scriptPath = `static/components/${uid}.js?v=${window.CACHE}`;

        // Create a new promise to track the script loading
        globalLoader[uid] = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = scriptPath;
            script.async = true;

            script.onload = () => {
                const LoadedComponent = window[uid];
                setComponent(() => LoadedComponent);
                resolve(LoadedComponent);
            };

            script.onerror = () => {
                reject(new Error(`Error loading script: ${scriptPath}`));
            };

            document.body.appendChild(script);
        });

        // Handle the case where the script finishes loading before the current component instance is rendered
        globalLoader[uid].then((LoadedComponent) => {
            setComponent(() => LoadedComponent);
        }).catch(error => {
            console.error(error);
        });

    }, [uid]);

    useEffect(() => {
        loadComponentScript();
    }, [loadComponentScript]);

    return Component;
};

export { useComponent };
