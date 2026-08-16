import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../utils";

interface AnimatedButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function AnimatedButton({
  children,
  className = "",
  ...props
}: AnimatedButtonProps) {
  return (
    <button
      className={cn(
        className,
        "inline-flex items-center justify-center gap-2",
        "!min-h-10 !rounded-full !border !border-primary/25 !bg-primary !px-5 !py-2.5 !text-sm !font-semibold !text-primary-foreground",
        "shadow-sm shadow-primary/15",
        "transition-all duration-200 hover:!bg-primary/90 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-0.5",
        "active:translate-y-0 active:scale-[0.98] active:shadow-none",
        "disabled:pointer-events-none disabled:opacity-45",
      )}
      {...props}
    >
      {children}
    </button>
  );
}
