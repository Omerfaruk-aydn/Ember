import React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { VisuallyHidden } from "./VisuallyHidden";

interface AccessibleButtonProps extends ButtonProps {
  label: string;
  description?: string;
  loading?: boolean;
  loadingText?: string;
}

export function AccessibleButton({
  label,
  description,
  loading,
  loadingText,
  children,
  disabled,
  ...props
}: AccessibleButtonProps) {
  return (
    <Button
      aria-label={label}
      aria-describedby={description ? `desc-${label}` : undefined}
      aria-busy={loading}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <VisuallyHidden>{loadingText || "Loading"}</VisuallyHidden>}
      {children}
      {description && (
        <VisuallyHidden id={`desc-${label}`}>{description}</VisuallyHidden>
      )}
    </Button>
  );
}
