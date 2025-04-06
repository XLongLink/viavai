import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TypeBreadcrumb } from "@/types";
import { Link } from "@/components/link";

export function Breadcrumb({ breadcrumb }: { breadcrumb?: TypeBreadcrumb[] }) {
    const BreadcrumbNav = ({ ...props }: React.ComponentProps<"nav"> & { separator?: React.ReactNode }) => (
        <nav aria-label="breadcrumb" {...props} />
    );

    const BreadcrumbList = ({ className, ...props }: React.ComponentProps<"ol">) => (
        <ol
            className={cn(
                "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
                className
            )}
            {...props}
        />
    );

    const BreadcrumbItem = ({ className, ...props }: React.ComponentProps<"li">) => (
        <li
            className={cn("inline-flex items-center gap-1.5", className)}
            {...props}
        />
    );

    const BreadcrumbLink = ({ className, ...props }: React.ComponentProps<"a">) => (
        <Link
            className={cn("transition-colors hover:text-foreground", className)}
            {...props}
        >
            {props.children}
        </Link>
    );

    const BreadcrumbPage = ({ className, ...props }: React.ComponentProps<"span">) => (
        <span
            role="link"
            aria-disabled="true"
            aria-current="page"
            className={cn("font-normal text-foreground", className)}
            {...props}
        />
    );

    const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<"li">) => (
        <li
            role="presentation"
            aria-hidden="true"
            className={cn("[&>svg]:w-3.5 [&>svg]:h-3.5", className)}
            {...props}
        >
            {children ?? <ChevronRight />}
        </li>
    );

    /* 
    const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
        <span
            role="presentation"
            aria-hidden="true"
            className={cn("flex h-9 w-9 items-center justify-center", className)}
            {...props}
        >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">More</span>
        </span>
    );
    */

    if (!breadcrumb) return <></>;

    return (
        <BreadcrumbNav>
            <BreadcrumbList>
                {breadcrumb.map((item, index) => {
                    const isActive = window.location.pathname === item.href;
                    const isLast = index === breadcrumb.length - 1;
                    return (
                        <React.Fragment key={index}>
                            {isActive ? (
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{item.name}</BreadcrumbPage>
                                </BreadcrumbItem>
                            ) : (
                                <BreadcrumbItem>
                                    <BreadcrumbLink href={item.href}>
                                        {item.name}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            )}
                            {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </BreadcrumbNav>
    );
}
