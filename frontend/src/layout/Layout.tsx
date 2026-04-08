'use client'

import React, { useCallback, useEffect, useState } from 'react'

import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/navigation'

import { LAYOUT_TYPES, SIDEBAR_SIZE } from '@src/components/constants/layout'
import { menu } from '@src/data/Sidebar/menu'
import { MainMenu, MegaMenu, SubMenu } from '@src/dtos'
import { changeHTMLAttribute, setNewThemeData } from '@src/slices/layout/utils'
import { useLayoutStore } from '@src/store/layoutStore'
import { useAuth } from '../contexts/AuthContext'
import { getFilteredMenu, shouldUseSuperAdminSidebar } from '@src/utils/menuFilter'
import { rbacService } from '@src/lib/rbac'

import Footer from './Footer'
import Topbar from './Topbar'
import MenuSearchModal from '@src/components/common/MenuSearchModal'

const SidebarComponent = dynamic(() => import('./Sidebar'), {
  ssr: false, // Disable SSR for this component
})

const SuperAdminSidebarComponent = dynamic(() => import('./SuperAdminSidebar'), {
  ssr: false, // Disable SSR for this component
})

export default function Layout({
  breadcrumbTitle,
  children,
}: {
  breadcrumbTitle?: string
  children: React.ReactNode
}) {
  const title = breadcrumbTitle
    ? ` ${breadcrumbTitle} | Eagle Analytics - Industrial IoT Platform `
    : 'Eagle Analytics - Industrial IoT Platform'
  const { isAuthenticated, isLoading } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
  const {
    layoutMode,
    layoutType,
    layoutWidth,
    layoutSidebar,
    layoutDarkModeClass,
    layoutSidebarColor,
    layoutDataColor,
    layoutDirection,
    changeSidebarSize,
    changeSettingModalOpen,
  } = useLayoutStore()
  const router = useRouter()
  useEffect(() => {
    // Redirect to landing page if not authenticated
    if (!isLoading && !isAuthenticated) {
      router.push('/landing')
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    // When the session is authenticated, store a flag in localStorage
    if (isAuthenticated) {
      localStorage.setItem('wasLoggedIn', 'true')
    }
  }, [isAuthenticated])
  const { user } = useAuth()
  const [searchSidebar, setSearchSidebar] = useState<MegaMenu[]>(menu)
  const [searchValue, setSearchValue] = useState<string>('')
  const [isLoadingMenu, setIsLoadingMenu] = useState<boolean>(true)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false)

  // Load and filter menu based on user role
  useEffect(() => {
    const loadMenu = async () => {
      if (!user) {
        setSearchSidebar([])
        setIsLoadingMenu(false)
        return
      }

      // SuperAdmin uses constant menu (handled separately in render)
      if (shouldUseSuperAdminSidebar(user)) {
        setSearchSidebar([])
        setIsLoadingMenu(false)
        return
      }

      try {
        const filteredMenu = await getFilteredMenu(user)
        setSearchSidebar(filteredMenu)
      } catch (error) {
        console.error('Error loading menu:', error)
        setSearchSidebar(menu) // Fallback to default menu
      } finally {
        setIsLoadingMenu(false)
      }
    }

    loadMenu()
  }, [user])
  const handleThemeSidebarSize = useCallback(() => {
    if (layoutType !== 'horizontal') {
      // Toggle between BIG and SMALL sidebar
      const newSize =
        layoutSidebar === SIDEBAR_SIZE.DEFAULT
          ? SIDEBAR_SIZE.SMALL
          : SIDEBAR_SIZE.DEFAULT
      setNewThemeData('data-sidebar-size', newSize)
      changeHTMLAttribute('data-sidebar', newSize)
      changeSidebarSize(newSize)
    } else {
      // If layout is horizontal, always use default size
      setNewThemeData('data-sidebar-size', SIDEBAR_SIZE.DEFAULT)
      changeHTMLAttribute('data-sidebar', SIDEBAR_SIZE.DEFAULT)
      changeSidebarSize(SIDEBAR_SIZE.DEFAULT)
    }
  }, [layoutType, layoutSidebar, changeSidebarSize])

  const toggleSidebar = () => {
    if (window.innerWidth < 1000) {
      // Toggle sidebar open/close for small screens
      setIsSidebarOpen((prev) => !prev)
      setNewThemeData('data-sidebar-size', SIDEBAR_SIZE.DEFAULT)
      changeHTMLAttribute('data-sidebar', SIDEBAR_SIZE.DEFAULT)
      changeSidebarSize(SIDEBAR_SIZE.DEFAULT)
    } else {
      // On larger screens, toggle between big and small sidebar
      handleThemeSidebarSize()
    }
  }
  useEffect(() => {
    const handleResize = () => {
      // Update the sidebar state based on the window width
      setIsSidebarOpen(window.innerWidth >= 1024)
      if (
        layoutType === LAYOUT_TYPES.SEMIBOX ||
        layoutType === LAYOUT_TYPES.MODERN
      ) {
        if (window.innerWidth > 1000) {
          // Set the layout to the layoutType if screen size is greater than 1000px
          document.documentElement.setAttribute('data-layout', layoutType)
        } else {
          // Set to 'default' if screen size is 1000px or less
          document.documentElement.setAttribute('data-layout', 'default')
        }
      } else {
        // For other layouts, just set to layoutType, no need to check screen size
        document.documentElement.setAttribute('data-layout', layoutType)
      }
    }
    // Initial layout check on component mount
    handleResize()
    // Listen for window resize events
    window.addEventListener('resize', handleResize)
    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [layoutType]) // Only rerun the effect when layoutType changes

  // handle search menu (only for non-SuperAdmin users)
  const handleSearchClient = (value: string) => {
    setSearchValue(value)

    // SuperAdmin search is handled separately in SuperAdminSidebar
    if (shouldUseSuperAdminSidebar(user)) {
      return
    }

    if (value.trim() !== '') {
      const filteredMenu: MegaMenu[] = searchSidebar.filter((megaItem: MegaMenu) => {
        // Filter the first level: MegaMenu
        const isMegaMenuMatch =
          megaItem.title.toLowerCase().includes(value.toLowerCase()) ||
          megaItem.lang.toLowerCase().includes(value.toLowerCase())

        // Filter the second level: MainMenu (children of MegaMenu)
        const filteredMainMenu = megaItem.children?.filter(
          (mainItem: MainMenu) => {
            const isMainMenuMatch =
              mainItem.title.toLowerCase().includes(value.toLowerCase()) ||
              mainItem.lang.toLowerCase().includes(value.toLowerCase())

            // Filter the third level: SubMenu (children of MainMenu)
            const filteredSubMenu = mainItem.children?.filter(
              (subItem: SubMenu) => {
                return (
                  subItem.title.toLowerCase().includes(value.toLowerCase()) ||
                  subItem.lang.toLowerCase().includes(value.toLowerCase())
                )
              }
            )
            // If SubMenu matches or MainMenu matches, return the filtered item
            return (
              isMainMenuMatch || (filteredSubMenu && filteredSubMenu.length > 0)
            )
          }
        )
        // Return MegaMenu item if it matches or has any matching MainMenu children
        return (
          isMegaMenuMatch || (filteredMainMenu && filteredMainMenu.length > 0)
        )
      })

      setSearchSidebar(filteredMenu)
    } else {
      // Reset to original filtered menu (not full menu)
      getFilteredMenu(user).then((filtered) => setSearchSidebar(filtered))
    }
  }

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (typeof window !== 'undefined') {
      // Check if page was refreshed by checking sessionStorage
      const isPageRefreshed = sessionStorage.getItem('isRefreshed')
      if (!isPageRefreshed) {
        sessionStorage.setItem('isRefreshed', 'true')
      } else {
        if (window.innerWidth >= 768) {
          timer = setTimeout(() => {
            changeSettingModalOpen(true)
          }, 500) // Delay to show modal after a short timeout
        }
      }
    }
    // Cleanup the timeout if the component is unmounted or the effect is cleaned up
    return () => {
      clearTimeout(timer)
      sessionStorage.removeItem('isRefreshed')
    }
  }, [changeSettingModalOpen])

  // Keyboard shortcut for search modal (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+K (Windows/Linux) or Cmd+K (Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchModalOpen((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
  const sidebarColors =
    (typeof document !== 'undefined' &&
      localStorage.getItem('data-sidebar-colors')) ||
    layoutSidebarColor

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('scroll-smooth', 'group')
      document.documentElement.setAttribute('data-mode', layoutMode)
      document.documentElement.setAttribute('data-colors', layoutDataColor)
      document.documentElement.setAttribute('lang', 'en')
      document.documentElement.setAttribute('data-layout', layoutType)
      document.documentElement.setAttribute('data-content-width', layoutWidth)
      document.documentElement.setAttribute(
        'data-sidebar',
        layoutType === 'horizontal' ? 'default' : layoutSidebar
      )
      document.documentElement.setAttribute(
        'data-sidebar-colors',
        layoutType === 'horizontal' ? 'light' : sidebarColors
      )
      document.documentElement.setAttribute(
        'data-nav-type',
        layoutDarkModeClass
      )
      document.documentElement.setAttribute('dir', layoutDirection)
    }
  }, [
    layoutMode,
    layoutType,
    layoutWidth,
    layoutSidebar,
    layoutSidebarColor,
    layoutDataColor,
    layoutDarkModeClass,
    layoutDirection,
    sidebarColors,
  ])
  return (
    <React.Fragment>
      {/* Main topbar */}
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Eagle Analytics is a comprehensive industrial IoT analytics platform designed to transform manufacturing operations through real-time monitoring, advanced analytics, and intelligent insights. Multi-tenant platform supporting 100+ manufacturing companies."
        />

        <meta name="author" content="Tecosoft" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="" />
        <meta
          property="og:title"
          content="Eagle Analytics - Industrial IoT Analytics Platform"
        />
        <meta
          property="og:description"
          content="Comprehensive industrial IoT analytics platform for manufacturing operations. Real-time monitoring, predictive maintenance, and operational excellence."
        />
        <meta property="twitter:url" content="" />
        <meta
          property="twitter:title"
          content="Eagle Analytics - Industrial IoT Analytics Platform"
        />
        <meta
          property="twitter:description"
          content="Transform manufacturing operations with Eagle Analytics. Real-time monitoring, advanced analytics, and intelligent insights for operational excellence."
        />
        <meta
          name="keywords"
          content="industrial iot analytics, manufacturing analytics, oee monitoring, predictive maintenance, energy monitoring, production analytics, quality control, manufacturing dashboard, iot platform, real-time monitoring, operational excellence"
        />
      </Head>

      <Topbar
        searchMenu={(value: string) => handleSearchClient(value)}
        searchText={searchValue}
        toggleSidebar={toggleSidebar}
      />

      {/* sidebar - conditionally render SuperAdmin or regular sidebar */}
      {shouldUseSuperAdminSidebar(user) ? (
        <SuperAdminSidebarComponent
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      ) : (
        <SidebarComponent
          searchSidebar={searchSidebar}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      )}

      <div className="relative min-h-screen group-data-[layout=boxed]:bg-white group-data-[layout=boxed]:rounded-md">
        <div className="page-wrapper pt-[calc(theme('spacing.topbar')_*_1.2)]">
          {children}
        </div>
        <Footer />
      </div>

      {/* Menu Search Modal */}
      {!shouldUseSuperAdminSidebar(user) && (
        <MenuSearchModal
          open={isSearchModalOpen}
          onOpenChange={setIsSearchModalOpen}
          menu={searchSidebar}
        />
      )}
    </React.Fragment>
  )
}
