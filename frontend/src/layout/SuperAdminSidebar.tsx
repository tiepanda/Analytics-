'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import user17 from '@assets/images/avatar/user-17.png'
import mainLogo from '@assets/images/main-logo.png'
import { LAYOUT_TYPES, SIDEBAR_SIZE } from '@src/components/constants/layout'
import {
    Dropdown,
    DropdownButton,
    DropdownMenu,
    DropdownPosition,
} from '@src/components/custom/dropdown/dropdown'
import { SUPER_ADMIN_MENU } from '@src/data/Sidebar/superAdminMenu'
import { ChevronDown, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useTranslation } from 'react-i18next'
import { useLayoutStore } from '@src/store/layoutStore'
import SimpleBar from 'simplebar-react'

interface SuperAdminSidebarProps {
    isSidebarOpen: boolean
    toggleSidebar: () => void
}

const SuperAdminSidebar = ({
    isSidebarOpen,
    toggleSidebar,
}: SuperAdminSidebarProps) => {
    const { t } = useTranslation()
    const router = usePathname()
    const [scrolled, setScrolled] = useState(false)
    const { layoutType, layoutSidebar } = useLayoutStore()
    const { user, logout } = useAuth()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const isActive = (href: string): boolean => {
        if (href === router) return true
        // Check if current route starts with href (for submenu items)
        return router.startsWith(href)
    }

    const handleMenuClick = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    if (!user) return null

    return (
        <>
            {isSidebarOpen === true && (
                <>
                    <div
                        id="main-sidebar"
                        className={`main-sidebar group-data-[layout=boxed]:top-[calc(theme('spacing.topbar')_+_theme('spacing.sidebar-boxed'))] lg:block ${scrolled ? 'group-data-[layout=boxed]:!top-topbar' : 'scrolled'
                            }`}>
                        <div className="sidebar-wrapper">
                            <div>
                                {/* Logo in Sidebar - Only for modern layout */}
                                <div className="navbar-brand hidden group-data-[layout=modern]:!flex group-data-[layout=default]:hidden group-data-[layout=horizontal]:hidden group-data-[layout=boxed]:hidden">
                                    <Link
                                        href="/dashboard"
                                        className="inline-flex items-center justify-center w-full py-3 px-4 group transition-all duration-300 hover:opacity-90"
                                    >
                                        {/* Full Sidebar - Logo with Text (Horizontal Layout) */}
                                        <div className="group-data-[sidebar=small]:hidden flex items-center gap-3 w-full">
                                            {/* Logo Image */}
                                            <div className="relative flex-shrink-0">
                                                <Image
                                                    src={mainLogo}
                                                    aria-label="Eagle Analytics Logo"
                                                    alt="Eagle Analytics Logo"
                                                    className="h-10 w-10 object-contain transition-all duration-300"
                                                    width={40}
                                                    height={40}
                                                    priority
                                                />
                                            </div>
                                            {/* Company Name - Horizontal beside logo, increased size */}
                                            <div className="flex flex-col justify-center flex-1 min-w-0">
                                                <span className="text-base md:text-lg font-extrabold bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 dark:from-blue-400 dark:via-cyan-300 dark:to-blue-400 bg-clip-text text-transparent leading-tight whitespace-nowrap">
                                                    Eagle Analytics
                                                </span>
                                                <span className="text-[10px] md:text-[11px] text-gray-500 dark:text-gray-400 font-medium leading-tight mt-1.5 whitespace-nowrap tracking-wider uppercase">
                                                    Industrial IoT Platform
                                                </span>
                                            </div>
                                        </div>
                                        {/* Collapsed Sidebar - Icon Only */}
                                        <div className="hidden group-data-[sidebar=small]:inline-block">
                                            <Image
                                                src={mainLogo}
                                                aria-label="Eagle Analytics Logo"
                                                alt="Eagle Analytics Logo"
                                                className="h-8 w-8 object-contain mx-auto transition-all duration-300"
                                                width={32}
                                                height={32}
                                                priority
                                            />
                                        </div>
                                    </Link>
                                </div>

                                <div className="relative group-data-[layout=horizontal]:hidden group-data-[sidebar=small]:w-full">
                                    <div className="block dropdown">
                                        <Dropdown
                                            toggleSidebar={toggleSidebar}
                                            position=""
                                            trigger="click"
                                            dropdownClassName="dropdown w-full">
                                            <DropdownButton colorClass="flex items-center w-full gap-2 p-4 text-left group-data-[sidebar=small]:px-0">
                                                <Image
                                                    src={user17}
                                                    alt="user"
                                                    className="h-10 rounded-md shrink-0 group-data-[sidebar=small]:mx-auto"
                                                    width={40}
                                                    height={40}
                                                />
                                                <div className="grow group-data-[sidebar=icon]:hidden group-data-[sidebar=small]:hidden overflow-hidden text-new-500">
                                                    <h6 className="font-medium truncate text-sidebar-text-active">
                                                        {user?.name ?? 'Super Admin'}
                                                    </h6>
                                                    <p className="text-menu-title text-14">
                                                        Role: {user?.role ?? 'SuperAdmin'}
                                                    </p>
                                                </div>
                                                <div className="shrink-0 text-sidebar-text group-data-[sidebar=icon]:hidden group-data-[sidebar=small]:hidden group-data-[sidebar=medium]:hidden">
                                                    <ChevronDown className="size-4" />
                                                </div>
                                            </DropdownButton>
                                            <DropdownMenu menuClass="z-50 p-5 bg-white rounded-md shadow-lg !w-64 !left-3">
                                                <div className="flex items-center gap-2">
                                                    <Image
                                                        src={user17}
                                                        alt="user"
                                                        className="rounded-full size-10"
                                                    />
                                                    <div>
                                                        <h6>Hello, {user?.name ?? 'Super Admin'}</h6>
                                                        <p>
                                                            <Link href="#!" className="link link-primary">
                                                                {user?.email ?? 'admin@eagle-analytics.com'}
                                                            </Link>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="pt-2 mt-3 border-t border-gray-200 dark:border-dark-800">
                                                    <Link
                                                        href="/landing"
                                                        className="!px-0 !py-1.5 before:hidden link link-primary"
                                                        onClick={() => {
                                                            logout()
                                                            window.location.href = '/landing'
                                                        }}>
                                                        <LogOut className="inline-block mr-2 size-4" /> Log
                                                        Out
                                                    </Link>
                                                </div>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>

                            <SimpleBar className="navbar-menu" id="navbar-menu-list">
                                <ul
                                    className="group-data-[layout=horizontal]:md:flex group-data-[layout=horizontal]:*:shrink-0"
                                    id="sidebar">
                                    {SUPER_ADMIN_MENU.map((item, index) => {
                                        const IconComponent = item.icon
                                        const hasSubmenu = item.submenu && item.submenu.length > 0 && item.submenu !== undefined

                                        return (
                                            <li key={index} className="relative">
                                                {hasSubmenu ? (
                                                    <Dropdown
                                                        position="top-right"
                                                        trigger="click"
                                                        isActive={isActive(item.href)}
                                                        toggleSidebar={toggleSidebar}>
                                                        <DropdownButton
                                                            colorClass={`nav-link flex items-center gap-2 ${isActive(item.href) ? 'active' : ''
                                                                }`}
                                                            arrow={true}>
                                                            <span className="w-6 group-data-[sidebar=small]:mx-auto shrink-0">
                                                                <IconComponent className="size-4 group-data-[sidebar=small]:size-5 group-data-[sidebar=medium]:size-5" />
                                                            </span>
                                                            <span className="group-data-[sidebar=small]:hidden">
                                                                {item.label}
                                                            </span>
                                                        </DropdownButton>
                                                        <DropdownMenu handleMenuClick={handleMenuClick} sidebar={true}>
                                                            <ul className="dropdown-wrapper">
                                                                {item.submenu?.map((subItem, subIndex) => (
                                                                    <li key={subIndex}>
                                                                        <Link
                                                                            href={subItem.href}
                                                                            className={`content ${isActive(subItem.href) ? 'active' : ''
                                                                                }`}>
                                                                            {subItem.label}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                ) : (
                                                    <Link
                                                        href={item.href}
                                                        className={`nav-link flex items-center gap-2 ${isActive(item.href) ? 'active' : ''
                                                            }`}>
                                                        <span className="w-6 group-data-[sidebar=small]:mx-auto shrink-0">
                                                            <IconComponent className="size-4 group-data-[sidebar=small]:size-5 group-data-[sidebar=medium]:size-5" />
                                                        </span>
                                                        <span className="group-data-[sidebar=small]:hidden">
                                                            {item.label}
                                                        </span>
                                                    </Link>
                                                )}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </SimpleBar>
                        </div>
                    </div>
                    <div
                        id="backdrop"
                        className="backdrop-overlay backdrop-blur-xs z-[1004] lg:hidden print:hidden"
                        onClick={toggleSidebar}></div>
                </>
            )}
        </>
    )
}

export default SuperAdminSidebar

