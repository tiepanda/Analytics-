'use client'

import React, { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useLayoutStore } from '@src/store/layoutStore'
import { useAuth } from '../contexts/AuthContext'

import DashboardPage from './(layout)/dashboard/page'
import Layout from './(layout)/layout'

export default function Home(): React.JSX.Element {
  const { changeSettingModalOpen } = useLayoutStore()
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()

  // Redirect to landing page if not authenticated, dashboard if authenticated
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/landing') // Redirects to landing page if not authenticated
      } else {
        router.push('/dashboard')
        setTimeout(() => {
          changeSettingModalOpen(true)
        }, 1000)
      }
    }
  }, [isAuthenticated, isLoading, router, changeSettingModalOpen])

  if (isLoading) {
    return <p>Loading...</p>
  }

  // Don't render anything if user is not authenticated - let the redirect handle it
  if (!isAuthenticated) {
    return <p>Redirecting to landing page...</p>
  }

  return (
    <main>
      <Layout>
        <DashboardPage />
      </Layout>
    </main>
  )
}
