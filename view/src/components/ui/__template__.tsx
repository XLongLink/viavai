import { HTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { type TypeComponent } from "@/types"

/* Define the variants */
const variants = cva(
    "text-sm",
    {
        variants: {
            variant: {
                default: "bg-primary",
                secondary: "bg-secondary",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

/* Define the component props */
export interface Props extends
    HTMLAttributes<HTMLElement>,
    VariantProps<typeof variants>,
    TypeComponent {
    type: 'string';
}


/* Define the component */
export function Component({ variant, children, ...props }: Props) {
    return (
        <div className={variants({ variant })} {...props}>
            {children}
        </div>
    )
}
