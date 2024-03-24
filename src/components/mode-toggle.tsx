import * as React from 'react';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';



export function ModeToggle() {
  const [theme, setThemeState] = React.useState<'light' | 'dark' | 'system'>(
    'light'
  );

  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setThemeState(isDarkMode ? 'dark' : 'light');
  }, []);

  React.useEffect(() => {
    const isDark =
      theme === 'dark' ||
      (theme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
  }, [theme]);

  return (
    <Button
      asChild
      size="sm"
      variant="ghost"
      onClick={() => setThemeState(theme === 'dark' ? 'light' : 'dark')}
    >
      <div className="justify-center align-middle">
        <span className="sr-only">Toggle mode</span>
        {theme && theme === 'dark' ? (
          <MoonIcon className="size-4" />
        ) : (
          <SunIcon className="size-4" />
        )}
      </div>
    </Button>
  );
}
