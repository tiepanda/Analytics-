import { Metadata } from 'next'

import '@assets/css/fonts/fonts.css'
import '@assets/css/icons.css'
import '@assets/css/plugins.css'
import '@assets/css/tailwind.css'
import ClientProviders from '@src/components/common/ClientProviders'
import { ThemeProvider } from '@src/components/theme-provider'
import 'flatpickr/dist/flatpickr.css'
import 'simplebar-react/dist/simplebar.min.css'

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    userScalable: 'no',
  }
}
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Eagle Analytics - Industrial IoT Analytics Platform',
    description:
      'Eagle Analytics is a comprehensive industrial IoT analytics platform designed to transform manufacturing operations through real-time monitoring, advanced analytics, and intelligent insights. Multi-tenant platform supporting 100+ manufacturing companies with complete operational visibility.',
    keywords: [
      'industrial iot analytics',
      'manufacturing analytics',
      'oee monitoring',
      'predictive maintenance',
      'energy monitoring',
      'production analytics',
      'quality control',
      'manufacturing dashboard',
      'iot platform',
      'real-time monitoring',
      'operational excellence',
    ],
    openGraph: {
      title: 'Eagle Analytics - Industrial IoT Analytics Platform',
      description:
        'Comprehensive industrial IoT analytics platform for manufacturing operations. Real-time monitoring, predictive maintenance, and operational excellence.',
      type: 'website',
    },
    twitter: {
      title: 'Eagle Analytics - Industrial IoT Analytics Platform',
      description:
        'Transform manufacturing operations with Eagle Analytics. Real-time monitoring, advanced analytics, and intelligent insights for operational excellence.',
    },
  }
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="data-mode"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ClientProviders>{children}</ClientProviders>
        </ThemeProvider>
      </body>
    </html>
  )
}
