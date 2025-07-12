// components/ui/badge.jsx
import React from "react";
import { cn } from "@/lib/utils"; // Assuming you have a utility function for class merging

const Badge = ({
    className,
    variant = "default",
    children,
    ...props
}) => {
    const variantClasses = {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground border border-input hover:bg-accent hover:text-accent-foreground",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                variantClasses[variant],
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
};

export { Badge };