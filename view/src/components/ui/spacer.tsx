import { cn } from "@/lib/utils";

type TailwindSpacing =
    | 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 5 | 6 | 7 | 8 | 9 | 10
    | 11 | 12 | 14 | 16 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48 | 52
    | 56 | 60 | 64 | 72 | 80 | 96;

interface SpacerProps {
    size?: TailwindSpacing;
    axis?: "vertical" | "horizontal";
    className?: string;
}

export function Spacer({ size = 4, axis = "vertical", className }: SpacerProps) {
    const spacingClass = axis === "vertical" ? `h-[${size}rem] w-0` : `w-[${size}rem] h-0`;

    return <div className={cn(spacingClass, className)} />;
}
