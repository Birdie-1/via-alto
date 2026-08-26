import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-sans uppercase font-medium tracking-brand transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm';

  const variants = {
    primary: 'bg-forest text-offwhite hover:bg-forest-light hover:shadow-md active:scale-[0.98]',
    secondary: 'bg-beige text-charcoal hover:bg-beige-dark active:scale-[0.98]',
    outline: 'border border-forest text-forest bg-transparent hover:bg-forest hover:text-offwhite active:scale-[0.98]',
    'outline-light': 'border border-offwhite/70 text-offwhite bg-transparent hover:bg-offwhite hover:text-forest active:scale-[0.98]',
    dark: 'bg-charcoal text-offwhite hover:bg-black active:scale-[0.98]',
    ghost: 'bg-transparent text-charcoal hover:text-forest hover:bg-beige/40',
    link: 'bg-transparent text-forest hover:underline p-0 h-auto'
  };

  const sizes = {
    sm: 'px-3.5 py-1.5 text-xs',
    md: 'px-5 py-2.5',
    lg: 'px-7 py-3.5 text-sm sm:text-base font-semibold',
    icon: 'p-2.5'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon size={16} className="mr-2" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon size={16} className="ml-2" />}
    </button>
  );
}
