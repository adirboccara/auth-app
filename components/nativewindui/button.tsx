import * as React from 'react';
import { Pressable, Text, PressableProps, ActivityIndicator, View } from 'react-native';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-12 px-4 py-3',
        sm: 'h-10 px-3',
        lg: 'h-14 px-8',
        icon: 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps extends PressableProps, VariantProps<typeof buttonVariants> {
  className?: string;
  children: React.ReactNode;
  loading?: boolean;
}

const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  ({ className, variant, size, children, loading, disabled, ...props }, ref) => {
    const textColorClass = cn(
      variant === 'default' && 'text-white',
      variant === 'outline' && 'text-foreground',
      variant === 'secondary' && 'text-secondary-foreground',
      variant === 'ghost' && 'text-foreground',
      variant === 'link' && 'text-primary'
    );

    return (
      <Pressable
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        {...props}>
        {({ pressed }) => (
          <View className="flex-row items-center justify-center">
            {loading && (
              <View className="mr-2">
                <ActivityIndicator
                  size="small"
                  color={variant === 'default' ? '#FFFFFF' : '#000000'}
                />
              </View>
            )}
            <Text
              className={cn(
                'text-base font-medium',
                textColorClass,
                pressed && 'opacity-70'
              )}>
              {loading ? 'Loading...' : children}
            </Text>
          </View>
        )}
      </Pressable>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
