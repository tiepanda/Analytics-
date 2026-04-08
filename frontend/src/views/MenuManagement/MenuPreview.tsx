'use client'

import React from 'react'
import { MenuItemData } from '@src/data/menuItems'
import { MenuAccessRule } from '@src/lib/menuAccessControl'
import { ChevronRight, ChevronDown } from 'lucide-react'
import Link from 'next/link'

interface MenuPreviewProps {
    menuItems: MenuItemData[]
    accessRules: MenuAccessRule[]
}

const MenuPreview: React.FC<MenuPreviewProps> = ({ menuItems, accessRules }) => {
    const [expandedItems, setExpandedItems] = React.useState<Set<string>>(new Set())

    const toggleExpand = (itemId: string) => {
        setExpandedItems((prev) => {
            const newSet = new Set(prev)
            if (newSet.has(itemId)) {
                newSet.delete(itemId)
            } else {
                newSet.add(itemId)
            }
            return newSet
        })
    }

    const getAccessRule = (menuItemId: string): MenuAccessRule | undefined => {
        return accessRules.find((rule) => rule.menuItemId === menuItemId)
    }

    const shouldShowItem = (item: MenuItemData): boolean => {
        const accessRule = getAccessRule(item.id)
        if (!accessRule) return true // Default show
        return accessRule.hasAccess && accessRule.isVisible
    }

    const renderMenuItem = (item: MenuItemData, depth = 0) => {
        if (!shouldShowItem(item)) return null

        const hasChildren = item.children && item.children.length > 0
        const isExpanded = expandedItems.has(item.id)
        const visibleChildren = item.children?.filter((child) => shouldShowItem(child)) || []

        return (
            <div key={item.id}>
                <div
                    className={`flex items-center gap-2 p-2 rounded hover:bg-gray-50 dark:hover:bg-dark-850 ${item.isSeparator ? 'border-t my-2 pt-3' : ''
                        }`}
                    style={{ paddingLeft: `${depth * 16 + 8}px` }}>
                    {hasChildren && visibleChildren.length > 0 && (
                        <button
                            onClick={() => toggleExpand(item.id)}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-dark-800 rounded">
                            {isExpanded ? (
                                <ChevronDown className="size-3" />
                            ) : (
                                <ChevronRight className="size-3" />
                            )}
                        </button>
                    )}
                    {!hasChildren && <div className="w-5" />}

                    {item.link && item.link !== '#' ? (
                        <Link href={item.link} className="flex-1 text-sm hover:text-primary-500">
                            {item.title}
                        </Link>
                    ) : (
                        <span className="flex-1 text-sm font-medium">{item.title}</span>
                    )}
                </div>

                {hasChildren && isExpanded && (
                    <div className="mt-1">
                        {item.children!.map((child) => renderMenuItem(child, depth + 1))}
                    </div>
                )}
            </div>
        )
    }

    const visibleItems = menuItems.filter((item) => shouldShowItem(item))

    return (
        <div className="card">
            <div className="card-header">
                <h6 className="card-title">Menu Preview</h6>
            </div>
            <div className="card-body">
                {visibleItems.length === 0 ? (
                    <div className="py-8 text-center text-gray-500 dark:text-dark-500">
                        No menu items visible. Configure menu access to see preview.
                    </div>
                ) : (
                    <div className="space-y-1">{visibleItems.map((item) => renderMenuItem(item))}</div>
                )}
            </div>
        </div>
    )
}

export default MenuPreview

