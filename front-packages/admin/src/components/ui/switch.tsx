import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import apiFetcher from '@/fetcher/apiFetcher';
import { cn } from '@/lib/utils';

interface APISwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  apiUrl: string;
  method?: 'POST' | 'PUT' | 'PATCH';
  onFilterChange: (filters: string) => void
  payloadKey?: string; // optional: to customize payload structure
  onToggle?: (checked: boolean) => void; // optional callback
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  APISwitchProps
>((
  { className,
    apiUrl,
    method = 'PATCH',
    payloadKey = 'enabled',
    onFilterChange,
    onToggle,
    ...props 
  }, ref) => {

  const handleChange = async (checked: boolean) => {
    try {
      // Optional callback
      onToggle?.(checked);

      // API call
      await apiFetcher.patch(apiUrl, { [payloadKey]: checked }).then((response) => {
        onFilterChange("");
      }).catch((errors) => console.log("errors : ", errors));
    } catch (error) {
      console.error('API switch error:', error);
    }
  };

  return (
    <SwitchPrimitives.Root
      className={cn(
        'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
        className
      )}
      onCheckedChange={handleChange}
      ref={ref}
      {...props}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0'
        )}
      />
    </SwitchPrimitives.Root>
  );
});

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
