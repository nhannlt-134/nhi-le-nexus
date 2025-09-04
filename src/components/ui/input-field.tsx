import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "w-full px-5 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-pink-400 transition-colors font-vietnam",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
InputField.displayName = "InputField"

export { InputField }