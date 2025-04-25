import type React from "react"
import type { Metadata } from "next"
import { Unbounded } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"

const unbounded = Unbounded({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "Modern Landing Page",
  description: "A modern landing page with animations",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={unbounded.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
