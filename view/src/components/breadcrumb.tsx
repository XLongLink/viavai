import React from "react";
import type { TypeBreadcrumb } from "@/types";
import {
    Breadcrumb as BreadcrumbComponent,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function Breadcrumb({ breadcrumb }: { breadcrumb?: TypeBreadcrumb[] }) {
    console.log(breadcrumb)
    if (!breadcrumb) return <></>;

    return (
        <BreadcrumbComponent>
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
        </BreadcrumbComponent>
    )
}