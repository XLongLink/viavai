import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
    HTMLDivElement,
    { className?: string; border?: boolean } & React.HTMLAttributes<HTMLDivElement>
>(({ className, border = false, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "rounded-lg bg-card text-card-foreground",
                border ? "border shadow-sm " : "",
                className
            )}
            {...props}
        />
    )
})
Card.displayName = "Card"

const CardAction = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex justify-end items-center", className)}
        {...props}
    />
))
CardAction.displayName = "CardAction"
// Augment the type definition for CardAction
interface CardActionType extends React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>> {
    isCardAction?: boolean;
}

const CardActionTyped = CardAction as CardActionType;
CardActionTyped.isCardAction = true;


const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }
>(({ className, children, ...props }, ref) => {
    // Filter out CardAction children based on the custom property
    const actionChildren = React.Children.toArray(children).filter(
        (child) =>
            React.isValidElement(child) &&
            typeof child.type !== 'string' &&
            (child.type as CardActionType)?.isCardAction
    );
    // All other children
    const mainChildren = React.Children.toArray(children).filter(
        (child) =>
            !(
                React.isValidElement(child) && (child.type as CardActionType)?.isCardAction
            )
    );

    return (
        <div ref={ref} className={cn("flex justify-between p-6", className)} {...props}>
            <div className="space-y-1.5">{mainChildren}</div>
            {actionChildren}
        </div>
    );
});
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("text-3xl font-semibold leading-none tracking-tight", className)}
        {...props}
    />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center p-6 pt-0", className)}
        {...props}
    />
))
CardFooter.displayName = "CardFooter"



export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, CardAction }
