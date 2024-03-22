import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';

export const LayoutHeader = () => {
  return (
    <header>
      <div className="flex items-center justify-between">
        <ModeToggle />
        <nav className="ml-auto space-x-6 text-sm font-medium">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </nav>
      </div>
    </header>
  );
};
