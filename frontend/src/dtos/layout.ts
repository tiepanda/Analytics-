import { FC, ReactElement } from 'react'

import { StaticImageData } from 'next/image'

import { LAYOUT_LANGUAGES } from '@src/components/constants/layout'
import { Permission } from '@src/lib/rbac'

// Define the type for pages that use a custom layout
export type NextPageWithLayout = FC & {
  getLayout?: (page: ReactElement) => ReactElement
}

export interface InterNationalization {
  id: number
  language: string
  code: LAYOUT_LANGUAGES
  flag: string | StaticImageData
}

export interface MegaMenu {
  id?: string // Unique identifier for menu item
  title: string
  lang: string
  icon?: string
  link?: string
  separator?: boolean
  dropdownPosition?: null
  children?: MainMenu[]
  megaMenu?: boolean
  // RBAC: Permission requirements for this menu item
  requiredPermissions?: Permission[] // Array of permissions (user needs any of these)
  permission?: Permission // Single permission (alternative to requiredPermissions)
}

export interface MainMenu {
  id?: string // Unique identifier for menu item
  title: string
  lang: string
  link: string
  dropdownPosition?: null
  children?: SubMenu[]
  // RBAC: Permission requirements for this menu item
  requiredPermissions?: Permission[]
  permission?: Permission
}

export interface SubMenu {
  id?: string // Unique identifier for menu item
  title: string
  lang: string
  link: string
  dropdownPosition?: null
  children: SubMenu[] // If submenus can be nested, otherwise use `children: []`
  // RBAC: Permission requirements for this menu item
  requiredPermissions?: Permission[]
  permission?: Permission
}
