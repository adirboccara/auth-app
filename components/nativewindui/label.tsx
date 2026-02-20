import * as React from 'react';
import { Text, TextProps } from 'react-native';
import { cn } from '@/lib/utils';

export interface LabelProps extends TextProps {
  className?: string;
  children: React.ReactNode;
}

const Label = React.forwardRef<Text, LabelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        className={cn(
          'text-sm font-medium leading-none text-foreground',
          'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          className
        )}
        {...props}>
        {children}
      </Text>
    );
  }
);

Label.displayName = 'Label';

export { Label };
