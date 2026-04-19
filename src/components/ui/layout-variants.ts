import { cva } from 'class-variance-authority';

export const skeletonVariants = cva(
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

export const navLinkVariants = cva(
  'flex items-center gap-4 rounded-lg px-3 py-2 text-sm font-medium transition-colors', 
  {
    variants: {
      active: {
        true: 'bg-secondary text-secondary-foreground',
        false: 'text-muted-foreground hover:bg-secondary hover:text-secondary-foreground',
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

export const iconButtonVariants = cva(
  'flex h-10 w-10 items-center justify-center rounded-full transition-colors', 
  {
    variants: {
      intent: {
        ghost: 'text-muted-foreground hover:bg-secondary hover:text-secondary-foreground',
        primary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      },
    },
    defaultVariants: {
      intent: 'ghost',
    },
  }
);

export const buttonVariants = cva(
  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
  {
    variants: {
      intent: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      },
    },
    defaultVariants: {
      intent: 'primary',
    },
  }
);
