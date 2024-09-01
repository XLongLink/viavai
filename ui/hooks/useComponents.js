import { useState, useEffect, useCallback } from 'react';

// Global object to track loading state
const scriptLoaders = {};

const useComponent = (path) => {
    const [folder, file] = path.split('/');
    const [Component, setComponent] = useState(null);

    const loadComponentScript = useCallback(() => {
        if (window[path]) {
            setComponent(() => window[path]);
            return;
        }

        // Check if the script is already loading
        if (scriptLoaders[path]) {
            scriptLoaders[path].then((LoadedComponent) => {
                setComponent(() => LoadedComponent);
            });
            return;
        }

        console.log('Loading script:', path);
        const scriptPath = `static/${folder}/${file}.js?v=${window.CACHE}`;

        // Create a new promise to track the script loading
        scriptLoaders[path] = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = scriptPath;
            script.async = true;

            script.onload = () => {
                const LoadedComponent = window[path];
                setComponent(() => LoadedComponent);
                resolve(LoadedComponent);
                console.log('Script loaded:', LoadedComponent);
            };

            script.onerror = () => {
                console.error(`Error loading script: ${scriptPath}`);
                reject(new Error(`Error loading script: ${scriptPath}`));
            };

            document.body.appendChild(script);
        });

        // Handle the case where the script finishes loading before the current component instance is rendered
        scriptLoaders[path].then((LoadedComponent) => {
            setComponent(() => LoadedComponent);
        }).catch(error => {
            console.error(error);
        });

    }, [path]);

    useEffect(() => {
        loadComponentScript();
    }, [loadComponentScript]);

    return Component;
};

export default useComponent;
