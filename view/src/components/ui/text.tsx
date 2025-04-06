import * as React from "react"
import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import type { TypeComponent } from "@/types"

const textVariants = cva(
    "block text-foreground",
    {
        variants: {
            variant: {
                title: "font-bold leading-tight",
                subtitle: "font-semibold text-muted-foreground",
                underline: "underline decoration-primary underline-offset-4",
                muted: "text-muted-foreground",
                italic: "italic",
            },
            size: {
                sm: "text-sm",
                base: "text-base",
                lg: "text-lg",
                xl: "text-xl",
                "2xl": "text-2xl",
            },
        },
        defaultVariants: {
            variant: "base",
            size: "base",
        },
    }
)

export interface TextProps
    extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
    asChild?: boolean
}

export interface TypeText extends TypeComponent {
    type: 'text';
    props: TextProps;
    children: string;
}

const Text = React.forwardRef<HTMLElement, TextProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "span"

        return (
            <Comp
                className={cn(textVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)

Text.displayName = "Text"

export { Text }
