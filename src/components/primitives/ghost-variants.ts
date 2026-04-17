import { cva } from 'class-variance-authority';

export const ghostVariants = cva(
  'animate-pulse bg-zinc-200 dark:bg-zinc-800', 
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
