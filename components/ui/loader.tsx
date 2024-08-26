"use client";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { useTheme } from "next-themes";
import * as React from "react";

const loadingVariants = cva("animate-spin rounded-full border-2 h-6 w-6", {
  variants: {
    variant: {
      dark: "   border-gray-900 border-t-transparent",
      light: "border-gray-50",
    },
    size: {
      lg: "h-16 w-16 border-4",
    },
  },
});
interface LoaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingVariants> {
  asChild?: boolean;
}

const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  ({ variant, size, className, ...props }, ref) => {
    const { theme, setTheme } = useTheme();

    return (
      <div
        ref={ref}
        className={cn(
          loadingVariants({ size }),
          className,
          `${
            theme == "dark"
              ? "border-gray-50 "
              : "border-gray-900 border-t-transparent"
          }`
        )}
        {...props}
      ></div>
    );
  }
);

Loader.displayName = "Loader";

export default Loader;
