import * as React from "react"
import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import type { TypeComponent } from "@/types"


const textVariants = cva(
    "text-foreground",
    {
        variants: {
            variant: {
                default: "text-base",
                title: "font-bold leading-tight",
                subtitle: "font-semibold text-muted-foreground",
                underline: "underline decoration-primary underline-offset-4",
                muted: "text-muted-foreground",
                italic: "italic",
            },
            size: {
                xs: "text-xs",
                sm: "text-sm",
                base: "text-base",
                lg: "text-lg",
                xl: "text-xl",
                "2xl": "text-2xl",
                "3xl": "text-3xl",
                "4xl": "text-4xl",
                "5xl": "text-5xl",
                "6xl": "text-6xl",
                "7xl": "text-7xl",
                "8xl": "text-8xl",
                "9xl": "text-9xl",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "base",
        },
    }
)

export interface TextProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
    asChild?: boolean
}

export interface TypeText extends TypeComponent {
    type: 'text';
    props: TextProps;
    children: string;
}

const Text = React.forwardRef<HTMLElement, TextProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "span"

    return (
        <Comp
            className={cn("block", textVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        />
    )
})

Text.displayName = "Text"

export { Text }
