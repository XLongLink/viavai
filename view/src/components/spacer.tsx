import * as React from "react"

interface SpacerProps {
    size?: number
    axis?: "horizontal" | "vertical"
}

const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
    ({ size = 1, axis = "horizontal", ...props }, ref) => {
        const style =
            axis === "horizontal"
                ? { width: `${size * 0.25}rem` }
                : { height: `${size * 0.25}rem` }

        return <div style={style} {...props} ref={ref} />
    }
)

Spacer.displayName = "Spacer"

export { Spacer }