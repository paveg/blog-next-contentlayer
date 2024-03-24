import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons';
import Link from 'next/link';
import { cfg } from '@/utils/constants';
import { Button } from '@/components/ui/button';

const iconClasses = 'h-5 w-5';

export const LayoutFooter = () => {
  const today = new Date();
  const startYear = 2023;

  return (
    <footer>
      <div className="p-4 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-xs text-muted-foreground md:text-sm">
            &copy; {startYear}-{today.getFullYear()} {cfg.author}. All rights
            reserved.
          </p>
          <div>
            <Button variant="ghost" size="icon" sChild>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={cfg.links.github}
                aria-label="Link to GitHub repository"
              >
                <GitHubLogoIcon className={iconClasses} />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link
                target="_blank"
                rel="noreferrer noopener"
                href={cfg.links.twitter}
                aria-label="Link to X(Twitter) timeline"
              >
                <TwitterLogoIcon className={iconClasses} />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link
                target="_blank"
                rel="noreferrer noopener"
                href={cfg.links.instagram}
                aria-label="Link to Instagram profile"
              >
                <InstagramLogoIcon className={iconClasses} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};
