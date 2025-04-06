import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"

const cardVariants = cva(
    "rounded-lg bg-card text-card-foreground p-6 transition-shadow duration-200 ease-in-out",
    {
        variants: {
            variant: {
                solid: "border shadow-sm",
                ghost: "border-none shadow-none",
            },
            content: {
                left: "text-left",
                center: "text-center",
                right: "text-right",
            },
        },
        defaultVariants: {
            variant: "solid",
            content: "left",
        },
    }
)

interface CardProps extends VariantProps<typeof cardVariants> {
    title?: string
    description?: string
    children?: React.ReactNode
    className?: string;
}

const Card = ({
    className,
    title,
    description,
    children,
    variant,
    content,
    ...props
}: CardProps) => {
    const showHeader = title || description

    const contentClass = cn(
        !showHeader && "flex flex-col justify-center h-full",
        showHeader && "mt-4"
    )

    return (
        <div className={cn(cardVariants({ variant, content }), className)} {...props}>
            {showHeader && (
                <>
                    {title && <div className="text-3xl font-semibold leading-none tracking-tight">{title}</div>}
                    {description && <div className="text-sm text-muted-foreground mt-1.5">{description}</div>}
                </>
            )}
            <div className={contentClass}>
                {children}
            </div>
        </div>
    )
}

Card.displayName = "Card"

export { Card }
