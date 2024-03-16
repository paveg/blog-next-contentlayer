import Link from "next/link"
import "./globals.css"
import { Inter } from "next/font/google"
import { Providers } from "@/components/providers"
import { Analytics } from "@/components/analytics"
import { ModeToggle } from "@/components/mode-toggle"
import { cfg } from "@/utils/constants"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: cfg.siteTitle,
  description: cfg.siteDescription,
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`min-h-screen bg-white text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50 ${inter.className}`}
      >
        <Providers>
          <div className="mx-auto max-w-2xl px-4 py-10">
            <header>
              <div className="flex items-center justify-between">
                <ModeToggle />
                <nav className="ml-auto space-x-6 text-sm font-medium">
                  <Link href="/">Home</Link>
                  <Link href="/about">About</Link>
                </nav>
              </div>
            </header>
            <main>{children}</main>
          </div>
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
