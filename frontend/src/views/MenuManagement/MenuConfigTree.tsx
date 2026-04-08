'use client'

import React, { useState } from 'react'
import { ChevronRight, ChevronDown, Menu as MenuIcon } from 'lucide-react'
import { MenuItemData } from '@src/data/menuItems'
import { MenuAccessRule } from '@src/lib/menuAccessControl'

interface MenuConfigTreeProps {
    menuItems: MenuItemData[]
    accessRules: MenuAccessRule[]
    onToggleAccess: (menuItemId: string, hasAccess: boolean) => void
    onToggleVisibility: (menuItemId: string, isVisible: boolean) => void
}

const MenuConfigTree: React.FC<MenuConfigTreeProps> = ({
    menuItems,
    accessRules,
    onToggleAccess,
    onToggleVisibility,
}) => {
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

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
        // Try exact match first
        let rule = accessRules.find((rule) => rule.menuItemId === menuItemId)
        // If not found, try matching by langKey or link
        if (!rule) {
            // This will be handled when menu items have proper IDs from data structure
        }
        return rule
    }

    const renderMenuItem = (item: MenuItemData, depth = 0) => {
        const accessRule = getAccessRule(item.id)
        const hasAccess = accessRule?.hasAccess ?? true
        const isVisible = accessRule?.isVisible ?? true
        const hasChildren = item.children && item.children.length > 0
        const isExpanded = expandedItems.has(item.id)

        return (
            <div key={item.id} className="select-none">
                <div
                    className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-850 ${depth > 0 ? 'ml-6' : ''
                        }`}
                    style={{ paddingLeft: `${depth * 24 + 12}px` }}>
                    {hasChildren && (
                        <button
                            onClick={() => toggleExpand(item.id)}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-dark-800 rounded">
                            {isExpanded ? (
                                <ChevronDown className="size-4" />
                            ) : (
                                <ChevronRight className="size-4" />
                            )}
                        </button>
                    )}
                    {!hasChildren && <div className="w-6" />}

                    {item.icon && (
                        <MenuIcon className="size-4 text-gray-500 dark:text-dark-500" />
                    )}

                    <div className="flex-1">
                        <div className="font-medium">{item.title}</div>
                        {item.link && (
                            <div className="text-xs text-gray-500 dark:text-dark-500">
                                {item.link}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={hasAccess}
                                    onChange={(e) => onToggleAccess(item.id, e.target.checked)}
                                    className="form-checkbox"
                                />
                                <span className="text-xs text-gray-600 dark:text-dark-400">
                                    Access
                                </span>
                            </label>
                        </div>

                        <div className="flex items-center gap-2">
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={isVisible}
                                    onChange={(e) => onToggleVisibility(item.id, e.target.checked)}
                                    className="form-checkbox"
                                    disabled={!hasAccess}
                                />
                                <span className="text-xs text-gray-600 dark:text-dark-400">
                                    Visible
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                {hasChildren && isExpanded && (
                    <div className="mt-1">
                        {item.children!.map((child) => renderMenuItem(child, depth + 1))}
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="p-4 border rounded-lg dark:border-dark-850 max-h-[600px] overflow-y-auto">
            {menuItems.map((item) => renderMenuItem(item))}
        </div>
    )
}

export default MenuConfigTree

