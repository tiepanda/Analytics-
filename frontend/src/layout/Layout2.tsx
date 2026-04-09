'use client'

import React from 'react'

import Head from 'next/head'

interface LayoutProps2 {
  children: React.ReactNode
  breadcrumbTitle?: string
}

const Layout2 = ({ children, breadcrumbTitle }: LayoutProps2) => {
  const title = breadcrumbTitle
    ? ` ${breadcrumbTitle} | Eagle Analytics - Industrial IIoT Analytics Platform `
    : 'Eagle Analytics - Industrial IIoT Analytics Platform'

  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
      </Head>

      <main>{children}</main>
    </React.Fragment>
  )
}

export default Layout2
