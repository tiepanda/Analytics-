import { create } from 'zustand'
import { persist } from 'zustand/middleware'
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
} from '@src/components/constants/layout'
import {
    changeHTMLAttribute,
    getPreviousStorageData,
    removeAttribute,
    setNewThemeData,
    appendDarkModeClass,
} from '@src/slices/layout/utils'

// Helper function to get environment variable with fallback
const getEnvVar = (key: string, fallback: string): string => {
    if (typeof window !== 'undefined') {
        return ((window as unknown) as { ENV?: Record<string, string> }).ENV?.[key] || process.env[key] || fallback
    }
    return process.env[key] || fallback
}

// Helper functions to safely map environment strings to enum values
const getLayoutType = (value: string): LAYOUT_TYPES => {
    const validTypes = Object.values(LAYOUT_TYPES) as string[]
    return validTypes.includes(value) ? (value as LAYOUT_TYPES) : LAYOUT_TYPES.VERTICAL
}

const getLayoutMode = (value: string): LAYOUT_MODE_TYPES => {
    const validModes = Object.values(LAYOUT_MODE_TYPES) as string[]
    return validModes.includes(value) ? (value as LAYOUT_MODE_TYPES) : LAYOUT_MODE_TYPES.LIGHT
}

const getLayoutWidth = (value: string): LAYOUT_CONTENT_WIDTH => {
    const validWidths = Object.values(LAYOUT_CONTENT_WIDTH) as string[]
    return validWidths.includes(value) ? (value as LAYOUT_CONTENT_WIDTH) : LAYOUT_CONTENT_WIDTH.DEFAULT
}

const getSidebarSize = (value: string): SIDEBAR_SIZE => {
    const validSizes = Object.values(SIDEBAR_SIZE) as string[]
    return validSizes.includes(value) ? (value as SIDEBAR_SIZE) : SIDEBAR_SIZE.DEFAULT
}

const getSidebarColor = (value: string): SIDEBAR_COLOR => {
    const validColors = Object.values(SIDEBAR_COLOR) as string[]
    return validColors.includes(value) ? (value as SIDEBAR_COLOR) : SIDEBAR_COLOR.LIGHT
}

const getLayoutDirection = (value: string): LAYOUT_DIRECTION => {
    const validDirections = Object.values(LAYOUT_DIRECTION) as string[]
    return validDirections.includes(value) ? (value as LAYOUT_DIRECTION) : LAYOUT_DIRECTION.LTR
}

const getDataColor = (value: string): DATA_COLORS => {
    const validColors = Object.values(DATA_COLORS) as string[]
    return validColors.includes(value) ? (value as DATA_COLORS) : DATA_COLORS.DEFAULT
}

const getNavigation = (value: string): MODERN_NAVIGATION => {
    const validNavs = Object.values(MODERN_NAVIGATION) as string[]
    return validNavs.includes(value) ? (value as MODERN_NAVIGATION) : MODERN_NAVIGATION.DEFAULT
}

const getDarkModeClass = (value: string): DARK_MODE_CLASS => {
    const validClasses = Object.values(DARK_MODE_CLASS) as string[]
    return validClasses.includes(value) ? (value as DARK_MODE_CLASS) : DARK_MODE_CLASS.DEFAULT
}

export interface LayoutState {
    layoutType: LAYOUT_TYPES
    layoutWidth: LAYOUT_CONTENT_WIDTH
    layoutMode: LAYOUT_MODE_TYPES
    layoutSidebar: SIDEBAR_SIZE
    layoutSidebarColor: SIDEBAR_COLOR
    layoutDirection: LAYOUT_DIRECTION
    layoutDataColor: DATA_COLORS
    layoutLanguages: LAYOUT_LANGUAGES
    layoutNavigation: MODERN_NAVIGATION
    layoutDarkModeClass: DARK_MODE_CLASS
    isSettingModalOpen: boolean
    // Actions
    changeLayout: (layout: LAYOUT_TYPES) => void
    changeLayoutWidth: (width: LAYOUT_CONTENT_WIDTH) => void
    changeLayoutMode: (mode: LAYOUT_MODE_TYPES) => void
    changeSidebarSize: (size: SIDEBAR_SIZE) => void
    changeSidebarColor: (color: SIDEBAR_COLOR) => void
    changeDirection: (direction: LAYOUT_DIRECTION) => void
    changeDataColor: (color: DATA_COLORS) => void
    changeLayoutLanguage: (language: LAYOUT_LANGUAGES) => void
    changeModernNavigation: (navigation: MODERN_NAVIGATION) => void
    changeDarkModeClass: (darkModeClass: DARK_MODE_CLASS) => void
    changeSettingModalOpen: (open: boolean) => void
}

const initialState = {
    layoutType: getLayoutType(getEnvVar('NEXT_PUBLIC_DEFAULT_LAYOUT_TYPE', 'VERTICAL')),
    layoutWidth: getLayoutWidth(getEnvVar('NEXT_PUBLIC_DEFAULT_LAYOUT_WIDTH', 'DEFAULT')),
    layoutMode: getLayoutMode(getEnvVar('NEXT_PUBLIC_DEFAULT_LAYOUT_MODE', 'LIGHT')),
    layoutSidebar: getSidebarSize(getEnvVar('NEXT_PUBLIC_DEFAULT_SIDEBAR_SIZE', 'DEFAULT')),
    layoutSidebarColor: getSidebarColor(getEnvVar('NEXT_PUBLIC_DEFAULT_SIDEBAR_COLOR', 'LIGHT')),
    layoutDirection: getLayoutDirection(getEnvVar('NEXT_PUBLIC_DEFAULT_LAYOUT_DIRECTION', 'LTR')),
    layoutDataColor: getDataColor(getEnvVar('NEXT_PUBLIC_DEFAULT_DATA_COLOR', 'DEFAULT')),
    layoutLanguages: LAYOUT_LANGUAGES.ENGLISH,
    layoutNavigation: getNavigation(getEnvVar('NEXT_PUBLIC_DEFAULT_NAVIGATION', 'DEFAULT')),
    layoutDarkModeClass: getDarkModeClass(getEnvVar('NEXT_PUBLIC_DEFAULT_DARK_MODE_CLASS', 'DEFAULT')),
    isSettingModalOpen: false,
}

export const useLayoutStore = create<LayoutState>()(
    persist(
        (set, get) => ({
            ...initialState,

            changeLayout: (layout: LAYOUT_TYPES) => {
                changeHTMLAttribute('data-layout', layout)

                if (layout === LAYOUT_TYPES.MODERN) {
                    const previousNavType = getPreviousStorageData('data-theme-nav-type') || 'default'
                    changeHTMLAttribute('data-nav-type', previousNavType)
                    setNewThemeData('data-theme-nav-type', previousNavType)
                } else {
                    changeHTMLAttribute('data-nav-type', '')
                }

                if (layout !== LAYOUT_TYPES.HORIZONTAL) {
                    const previousNavType = getPreviousStorageData('data-sidebar-size') || 'default'
                    const previousSidebarColor = getPreviousStorageData('data-sidebar-colors') || 'dark'
                    changeHTMLAttribute('data-sidebar', previousNavType)
                    setNewThemeData('data-sidebar-size', previousNavType)
                    changeHTMLAttribute('data-sidebar-colors', previousSidebarColor)
                } else {
                    changeHTMLAttribute('data-sidebar', '')
                    changeHTMLAttribute('data-sidebar-colors', '')
                }

                setNewThemeData('data-layout-type', layout)
                set({ layoutType: layout })
            },

            changeLayoutWidth: (width: LAYOUT_CONTENT_WIDTH) => {
                changeHTMLAttribute('data-content-width', width)
                setNewThemeData('data-layout-content-width', width)
                set({ layoutWidth: width })
            },

            changeLayoutMode: (mode: LAYOUT_MODE_TYPES) => {
                changeHTMLAttribute('data-mode', mode)
                setNewThemeData('data-layout-mode', mode)
                set({ layoutMode: mode })
            },

            changeSidebarSize: (size: SIDEBAR_SIZE) => {
                const state = get()
                if (state.layoutType !== LAYOUT_TYPES.HORIZONTAL) {
                    switch (size) {
                        case 'default':
                            changeHTMLAttribute('data-sidebar', 'default')
                            break
                        case 'medium':
                            changeHTMLAttribute('data-sidebar', 'medium')
                            break
                        case 'small':
                            changeHTMLAttribute('data-sidebar', 'small')
                            break
                        default:
                            changeHTMLAttribute('data-sidebar', 'default')
                    }
                    setNewThemeData('data-sidebar-size', size)
                }
                set({ layoutSidebar: size })
            },

            changeSidebarColor: (color: SIDEBAR_COLOR) => {
                const state = get()
                if (state.layoutType === LAYOUT_TYPES.HORIZONTAL) {
                    removeAttribute('data-sidebar-colors')
                } else {
                    changeHTMLAttribute('data-sidebar-colors', color)
                    setNewThemeData('data-sidebar-colors', color)
                }
                set({ layoutSidebarColor: color })
            },

            changeDirection: (direction: LAYOUT_DIRECTION) => {
                changeHTMLAttribute('dir', direction)
                setNewThemeData('data-layout-direction', direction)
                set({ layoutDirection: direction })
            },

            changeDataColor: (color: DATA_COLORS) => {
                changeHTMLAttribute('data-colors', color)
                setNewThemeData('data-theme-color', color)
                set({ layoutDataColor: color })
            },

            changeLayoutLanguage: (language: LAYOUT_LANGUAGES) => {
                changeHTMLAttribute('lang', language)
                setNewThemeData('data-layout-language', language)
                set({ layoutLanguages: language })
            },

            changeModernNavigation: (navigation: MODERN_NAVIGATION) => {
                const state = get()
                if (state.layoutType === LAYOUT_TYPES.MODERN) {
                    changeHTMLAttribute('data-nav-type', navigation)
                    setNewThemeData('data-theme-nav-type', navigation)
                }
                set({ layoutNavigation: navigation })
            },

            changeDarkModeClass: (darkModeClass: DARK_MODE_CLASS) => {
                const updatedClass = appendDarkModeClass('scroll-smooth group', darkModeClass)
                changeHTMLAttribute('class', updatedClass)
                setNewThemeData('data-theme-dark-class', darkModeClass)
                set({ layoutDarkModeClass: darkModeClass })
            },

            changeSettingModalOpen: (open: boolean) => {
                set({ isSettingModalOpen: open })
            },
        }),
        {
            name: 'layout-storage',
            partialize: (state) => ({
                layoutType: state.layoutType,
                layoutWidth: state.layoutWidth,
                layoutMode: state.layoutMode,
                layoutSidebar: state.layoutSidebar,
                layoutSidebarColor: state.layoutSidebarColor,
                layoutDirection: state.layoutDirection,
                layoutDataColor: state.layoutDataColor,
                layoutLanguages: state.layoutLanguages,
                layoutNavigation: state.layoutNavigation,
                layoutDarkModeClass: state.layoutDarkModeClass,
            }),
        }
    )
)

// Export initial state for reset functionality
export { initialState }

