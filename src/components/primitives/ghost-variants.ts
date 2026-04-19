import { cva } from 'class-variance-authority';

export const ghostVariants = cva(
  'animate-pulse bg-muted', 
  {
    variants: {
      shape: {
        circle: 'rounded-full',
        rounded: 'rounded',
        full: 'rounded-none',
      },
    },
    defaultVariants: {
      shape: 'rounded',
    },
  }
);
