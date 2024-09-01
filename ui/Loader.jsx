import React from 'react';
import useComponent from './hooks/useComponents';

function Loader({ type, component }) {

    const path = `${type}/${component}`;
    const Component = useComponent(path);

    if (!Component) {
        return <></>;
    }

    return <Component />;
};

export default Loader;