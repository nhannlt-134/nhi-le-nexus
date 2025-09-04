import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface TextareaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "w-full px-5 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-pink-400 transition-colors font-vietnam resize-none",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
TextareaField.displayName = "TextareaField"

export { TextareaField }