// components/ui/flex-box.tsx

import React from "react";
import { cn } from "@/lib/utils";

type FlexBoxProps = {
    children: React.ReactNode;
    variant?: "start" | "end" | "between" | "center" | "around";
    className?: string;
};

const variantMap: Record<NonNullable<FlexBoxProps["variant"]>, string> = {
    start: "justify-start",
    end: "justify-end",
    between: "justify-between",
    center: "justify-center",
    around: "justify-around",
};

export function Flex({ children, variant = "start", className }: FlexBoxProps) {
    return (
        <div className={cn("flex flex-wrap gap-4", variantMap[variant], className)}>
            {React.Children.map(children, (child, i) => (
                <div key={i} className="flex-1">
                    {child}
                </div>
            ))}
        </div>
    );
}
