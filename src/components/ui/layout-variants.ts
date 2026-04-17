import { cva } from 'class-variance-authority';

export const skeletonVariants = cva(
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

export const navLinkVariants = cva(
  'flex items-center gap-4 rounded-lg px-3 py-2 text-sm font-medium transition-colors', 
  {
    variants: {
      active: {
        true: 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100',
        false: 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900',
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

export const buttonVariants = cva(
  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
  {
    variants: {
      intent: {
        primary: 'bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200',
        secondary: 'bg-zinc-200 text-zinc-900 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700',
      },
    },
    defaultVariants: {
      intent: 'primary',
    },
  }
);


export const iconButtonVariants = cva(
  'flex h-10 w-10 items-center justify-center rounded-full transition-colors', 
  {
    variants: {
      intent: {
        ghost: 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800',
        primary: 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700',
      },
    },
    defaultVariants: {
      intent: 'ghost',
    },
  }
);
