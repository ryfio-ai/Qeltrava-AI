import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary-dark' | 'secondary-light' | 'outline';
  href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className = '', variant = 'primary', href, children, ...props }, ref) => {
    
    let variantStyles = "cta-button";
    if (variant === 'secondary-dark') {
       variantStyles = "bg-transparent text-white border border-white/25 hover:bg-white/10";
    } else if (variant === 'secondary-light' || variant === 'outline') {
       variantStyles = "bg-white text-[var(--color-primary-dark)] border border-[var(--color-border-soft)] hover:bg-[var(--color-bg-light)]";
    }

    const baseStyles = "inline-flex items-center justify-center rounded-full px-6 py-3 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";
    const combinedClassName = `${baseStyles} ${variantStyles} ${className}`;

    if (href) {
      return (
        <Link href={href} className={combinedClassName}>
          {children}
        </Link>
      );
    }

    return (
      <button
        className={combinedClassName}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"
