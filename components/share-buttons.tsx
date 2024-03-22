'use client';

import { Share2Icon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { TwitterShareButton } from 'react-share';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Props = {
  title: string;
  url: string;
  hashtags: string[];
};
export const ShareButtons = ({ url, title, hashtags }: Props) => {
  return (
    <div className="flex justify-end gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Share2Icon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <TwitterShareButton title={title} url={url} hashtags={hashtags}>
              <div className="flex items-center gap-4">
                <TwitterLogoIcon className="h-4 w-4" />
                <span>Twitter</span>
              </div>
            </TwitterShareButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
