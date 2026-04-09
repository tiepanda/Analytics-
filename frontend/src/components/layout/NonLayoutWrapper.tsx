'use client'

import { ReactNode, useEffect } from 'react'

import { usePathname } from 'next/navigation'

import { routes } from '@src/components/common/DynamicTitle'
import Layout2 from '@src/layout/Layout2'

interface LayoutWrapperProps {
  children: ReactNode
}

export default function NonLayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()
  const route = routes.find((r) => r.path === pathname)

  useEffect(() => {
    document.title = route
      ? `${route.title} | Eagle Analytics - Industrial IIoT Analytics Platform`
      : 'Eagle Analytics - Industrial IIoT Analytics Platform'
  }, [route])

  return <Layout2>{children}</Layout2>
}
