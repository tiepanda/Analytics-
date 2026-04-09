import { MenuItemData } from '@src/data/menuItems'
import { MenuAccessRule } from '@src/lib/menuAccessControl'

export interface MenuTemplate {
  version: string
  exportedAt: string
  menuItems: Omit<MenuItemData, 'id' | 'parentId'>[]
  accessRules?: MenuAccessRule[]
}

/**
 * Export menu structure and access rules to JSON file
 */
export const exportMenuToFile = (
  menuItems: MenuItemData[],
  accessRules?: MenuAccessRule[]
): void => {
  const template: MenuTemplate = {
    version: '1.0',
    exportedAt: new Date().toISOString(),
    menuItems: menuItems.map(({ id, parentId, ...item }) => ({
      ...item,
      parentTitle: item.title, // Keep reference for reconstruction
    })),
    accessRules,
  }

  const dataStr = JSON.stringify(template, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = `menu-template-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Export menu configuration for a specific role
 */
export const exportRoleMenuConfig = (
  roleId: string,
  roleName: string,
  menuItems: MenuItemData[],
  accessRules: MenuAccessRule[]
): void => {
  const template = {
    version: '1.0',
    exportedAt: new Date().toISOString(),
    roleId,
    roleName,
    menuItems: menuItems.map(({ id, parentId, children, ...item }) => item),
    accessRules: accessRules.map(({ roleId: _, ...rule }) => rule),
  }

  const dataStr = JSON.stringify(template, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = `menu-config-${roleName}-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Import menu structure from JSON file
 */
export const importMenuFromFile = (file: File): Promise<MenuTemplate> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const template: MenuTemplate = JSON.parse(content)

        // Validate template structure
        if (!template.version || !template.menuItems || !Array.isArray(template.menuItems)) {
          throw new Error('Invalid template format')
        }

        // Validate each menu item
        template.menuItems.forEach((item, index) => {
          if (!item.title) {
            throw new Error(`Invalid menu item at index ${index}: missing title`)
          }
        })

        resolve(template)
      } catch (error) {
        reject(new Error(`Failed to parse file: ${error instanceof Error ? error.message : 'Unknown error'}`))
      }
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsText(file)
  })
}

