'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const pathname = usePathname()

  // Only apply next-themes to landing and auth pages, not dashboard
  const isLandingOrAuth = pathname === '/' || pathname?.startsWith('/auth') || pathname?.startsWith('/landing')

  // If pathname is null/undefined, wait for it to be available
  if (pathname === null || pathname === undefined) {
    return <>{children}</>
  }

  if (!isLandingOrAuth) {
    // For dashboard pages, just return children without theme provider
    return <>{children}</>
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
