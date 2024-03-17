import { GitHubLogoIcon, InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { cfg } from "@/utils/constants"
import { Button } from "@/components/ui/button"

const iconClasses = "h-5 w-5"

export const LayoutFooter = () => {
  const today = new Date()
  const startYear = 2023

  return (
    <footer>
      <div className="py-10 md:px-8 md:py-0">
        <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          &copy; {startYear}-{today.getFullYear()} {cfg.author}. All rights reserved.
          <div>
            <Button variant="ghost" size="icon" asChild>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={cfg.links.github}
              >
                <GitHubLogoIcon className={iconClasses} />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link
                target="_blank"
                rel="noreferrer noopener"
                href={cfg.links.twitter}
              >
                <TwitterLogoIcon className={iconClasses} />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link
                target="_blank"
                rel="noreferrer noopener"
                href={cfg.links.instagram}
              >
                <InstagramLogoIcon className={iconClasses} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}