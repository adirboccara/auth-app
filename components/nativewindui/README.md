# NativeWindUI Components

This directory is for NativeWindUI components. 

NativeWindUI is not a traditional npm package - instead, you copy components directly from the [NativeWindUI website](https://nativewindui.com/) into this directory.

## Getting Started

1. Visit [NativeWindUI Components](https://nativewindui.com/components)
2. Browse the component library
3. Copy the component code you need
4. Paste it into a new file in this directory
5. Import and use it in your app

## Example Usage

```tsx
import { Button } from '@/components/nativewindui/button';

export default function MyScreen() {
  return (
    <Button>Click me</Button>
  );
}
```

## Notes

- Components are platform-specific (iOS and Android versions)
- Make sure NativeWind is properly configured (already set up in this project)
- Components use Tailwind CSS classes via NativeWind
