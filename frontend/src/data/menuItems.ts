import { MegaMenu } from '@src/dtos'
import { menu } from '@src/data/Sidebar/menu'

// Flatten menu items for menu management
export interface MenuItemData {
    id: string
    title: string
    langKey: string
    icon?: string
    link?: string
    section?: string
    parentId?: string
    level: number // 0 = root, 1 = child, 2 = grandchild
    isSeparator: boolean
    children?: MenuItemData[]
}

// Convert MegaMenu to flat structure with IDs
export function flattenMenuItems(menuItems: MegaMenu[], parentId?: string, level = 0): MenuItemData[] {
    const result: MenuItemData[] = []

    menuItems.forEach((item, index) => {
        const id = parentId ? `${parentId}-${index}` : `menu-${index}`
        const menuItem: MenuItemData = {
            id,
            title: item.title,
            langKey: item.lang,
            icon: item.icon,
            link: item.link || undefined,
            section: undefined,
            parentId: parentId || undefined,
            level,
            isSeparator: item.separator || false,
        }

        result.push(menuItem)

        if (item.children && item.children.length > 0) {
            const children = flattenMenuItems(item.children, id, level + 1)
            result.push(...children)
        }
    })

    return result
}

// Get all menu items (used for menu management)
export const ALL_MENU_ITEMS = flattenMenuItems(menu)

// Build tree structure for display
export function buildMenuTree(items: MenuItemData[]): MenuItemData[] {
    const itemMap = new Map<string, MenuItemData>()
    const rootItems: MenuItemData[] = []

    // First pass: create map of all items
    items.forEach((item) => {
        itemMap.set(item.id, { ...item, children: [] })
    })

    // Second pass: build tree
    items.forEach((item) => {
        const menuItem = itemMap.get(item.id)!
        if (item.parentId) {
            const parent = itemMap.get(item.parentId)
            if (parent) {
                if (!parent.children) {
                    parent.children = []
                }
                parent.children.push(menuItem)
            }
        } else {
            rootItems.push(menuItem)
        }
    })

    return rootItems
}

