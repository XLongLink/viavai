import * as React from "react";
import { cn } from "@/lib/utils";
import type { TypeComponent } from "@/types"

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "start" | "end" | "between" | "center" | "around";
}

const variantMap: Record<NonNullable<FlexProps["variant"]>, string> = {
    start: "justify-start",
    end: "justify-end",
    between: "justify-between",
    center: "justify-center",
    around: "justify-around",
};

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
    ({ className, variant = "start", children, ...props }, ref) => {
        return (
            <div
                className={cn(
                    "flex flex-wrap gap-4",
                    variantMap[variant],
                    className
                )}
                ref={ref}
                {...props}
            >
                {React.Children.map(children, (child, i) => (
                    <div key={i} className="flex-1">
                        {child}
                    </div>
                ))}
            </div>
        );
    }
);
Flex.displayName = "Flex";

export { Flex };
