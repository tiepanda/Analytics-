'use client'

import { ReactNode, useEffect } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { getPreviousStorageData } from '@src/slices/layout/utils'
import { useLayoutStore, initialState } from '@src/store/layoutStore'
import { queryClient } from '@src/lib/queryClient'

import { AuthProvider } from '../../contexts/AuthContext'
import {
  DARK_MODE_CLASS,
  DATA_COLORS,
  LAYOUT_CONTENT_WIDTH,
  LAYOUT_DIRECTION,
  LAYOUT_LANGUAGES,
  LAYOUT_MODE_TYPES,
  LAYOUT_TYPES,
  MODERN_NAVIGATION,
  SIDEBAR_COLOR,
  SIDEBAR_SIZE,
} from '../constants/layout'

interface ClientProvidersProps {
  children: ReactNode
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  const {
    changeLayoutMode,
    changeLayoutWidth,
    changeSidebarSize,
    changeDirection,
    changeLayout,
    changeSidebarColor,
    changeLayoutLanguage,
    changeDataColor,
    changeDarkModeClass,
    changeModernNavigation,
  } = useLayoutStore()

  useEffect(() => {
    const htmlElement = document.documentElement
    htmlElement.classList.add('scroll-smooth', 'group')
    return () => {
      htmlElement.classList.remove('scroll-smooth', 'group')
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      changeLayoutMode(
        (getPreviousStorageData('data-layout-mode') as LAYOUT_MODE_TYPES) ??
        initialState.layoutMode
      )
      changeLayoutWidth(
        (getPreviousStorageData(
          'data-layout-content-width'
        ) as LAYOUT_CONTENT_WIDTH) ?? initialState.layoutWidth
      )
      changeSidebarSize(
        (getPreviousStorageData('data-sidebar-size') as SIDEBAR_SIZE) ??
        initialState.layoutSidebar
      )
      changeDirection(
        (getPreviousStorageData(
          'data-layout-direction'
        ) as LAYOUT_DIRECTION) ?? initialState.layoutDirection
      )
      changeLayout(
        (getPreviousStorageData('data-layout-type') as LAYOUT_TYPES) ??
        initialState.layoutType
      )
      changeSidebarColor(
        (getPreviousStorageData('data-sidebar-colors') as SIDEBAR_COLOR) ??
        initialState.layoutSidebarColor
      )
      changeLayoutLanguage(
        Object.values(LAYOUT_LANGUAGES).includes(
          getPreviousStorageData('data-layout-language') as LAYOUT_LANGUAGES
        )
          ? (getPreviousStorageData(
            'data-layout-language'
          ) as LAYOUT_LANGUAGES)
          : LAYOUT_LANGUAGES.ENGLISH
      )
      changeDataColor(
        (getPreviousStorageData('data-theme-color') as DATA_COLORS) ??
        initialState.layoutDataColor
      )
      changeDarkModeClass(
        (getPreviousStorageData(
          'data-theme-dark-class'
        ) as DARK_MODE_CLASS) ?? initialState.layoutDarkModeClass
      )
      changeModernNavigation(
        (getPreviousStorageData(
          'data-theme-nav-type'
        ) as MODERN_NAVIGATION) ?? initialState.layoutNavigation
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
        {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </AuthProvider>
    </QueryClientProvider>
  )
}
