import React from 'react';
import { useWebSocket } from '@/hooks/use-socket.tsx'

interface InterceptLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href?: string;
    children: React.ReactNode;
}

export function Link({ href, children, onClick, ...rest }: InterceptLinkProps) {
    const { send } = useWebSocket()

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
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
        if (href) send('href', { href });
    };

    return (
        <a href={href} onClick={handleClick} {...rest}>
            {children}
        </a>
    );
}
