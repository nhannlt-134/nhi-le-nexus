import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "white";
}

const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-transform duration-300 font-vietnam",
          variant === "default" && "gradient-button text-white",
          variant === "white" && "bg-white text-pink-500 hover:scale-105",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)
GradientButton.displayName = "GradientButton"

export { GradientButton }