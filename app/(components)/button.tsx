import clsx from 'clsx';
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

type ButtonProps = {
  children: React.ReactNode;
  buttonProps: ButtonHTMLAttributes<HTMLButtonElement>;
  className?: string;
};

const Button = ({ children, buttonProps, className }: ButtonProps) => {
  return (
    <button
      className={clsx(
        'bg-planarific-200 font-medium text-xs text-nowrap px-4 py-2 rounded-md text-white hover:bg-planarific-500',
        className
      )}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
