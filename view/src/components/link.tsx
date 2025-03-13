import React from 'react';

interface InterceptLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href?: string;
    children: React.ReactNode;
}

export function Link({ href, children, onClick, ...rest }: InterceptLinkProps) {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // TODO: Here send a request to the server to get the page content
        // and update the page content with the response

        if (onClick) onClick(e);
        if (
            e.defaultPrevented ||
            e.button !== 0 ||
            e.metaKey ||
            e.altKey ||
            e.ctrlKey ||
            e.shiftKey
        ) {
            return;
        }
        e.preventDefault();
        window.history.pushState({}, '', href);
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    return (
        <a href={href} onClick={handleClick} {...rest}>
            {children}
        </a>
    );
}
