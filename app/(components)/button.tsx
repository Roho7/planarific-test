import clsx from 'clsx';
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

type ButtonProps = {
  children: React.ReactNode;
  buttonProps: ButtonHTMLAttributes<HTMLButtonElement>;
  className?: string;
  type?: 'primary' | 'secondary';
};

const Button = ({
  children,
  buttonProps,
  className,
  type = 'primary',
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        ' flex justify-center w-fit font-medium text-xs text-nowrap px-4 py-2 rounded-md ',
        className,
        type === 'primary' &&
          'bg-planarific-200 border border-planarific-500 text-white hover:bg-planarific-500',
        type === 'secondary' &&
          'bg-white text-gray-600 border border-gray-400 hover:bg-gray-200'
      )}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
