import React, { useState, useEffect, Suspense } from 'react';
import ReactDOM from 'react-dom';
import Dynamic from './Dynamic';

const App = () => {
    const [count, setCount] = useState(0);
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

        return () => clearTimeout(timeoutId); // Cleanup to avoid memory leaks
    }, []);

    return (
        <div>
            <h1>Hello, React!</h1>
            <p>This is a simple React app.</p>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <Suspense fallback={<p>Loading...</p>}>
                {componentName && <Dynamic componentName={componentName} />}
            </Suspense>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));