import React from "react";

interface SkipLinkProps {
  href?: string;
  label?: string;
}

export function SkipLink({ href = "#main-content", label = "Skip to main content" }: SkipLinkProps) {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-brand-600 focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
    >
      {label}
    </a>
  );
}
