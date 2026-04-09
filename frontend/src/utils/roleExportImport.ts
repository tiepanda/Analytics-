import { RoleData } from '@src/data/roles'
import { Permission } from '@src/lib/rbac'

export interface RoleTemplate {
    version: string
    exportedAt: string
    roles: Omit<RoleData, 'id' | 'createdAt' | 'updatedAt' | 'userCount'>[]
}

/**
 * Export roles to JSON file
 */
export const exportRolesToFile = (roles: RoleData[]): void => {
    const template: RoleTemplate = {
        version: '1.0',
        exportedAt: new Date().toISOString(),
        roles: roles.map(({ id, createdAt, updatedAt, userCount, ...role }) => role),
    }

    const dataStr = JSON.stringify(template, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `roles-template-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}

/**
 * Import roles from JSON file
 */
export const importRolesFromFile = (
    file: File
): Promise<RoleTemplate> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            try {
                const content = e.target?.result as string
                const template: RoleTemplate = JSON.parse(content)

                // Validate template structure
                if (!template.version || !template.roles || !Array.isArray(template.roles)) {
                    throw new Error('Invalid template format')
                }

                // Validate each role
                template.roles.forEach((role, index) => {
                    if (!role.name || !role.code) {
                        throw new Error(`Invalid role at index ${index}: missing name or code`)
                    }
                    if (!Array.isArray(role.permissions)) {
                        throw new Error(`Invalid role at index ${index}: permissions must be an array`)
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

/**
 * Validate imported roles against existing roles
 */
export const validateImportedRoles = (
    importedRoles: RoleTemplate['roles'],
    existingRoles: RoleData[]
): { valid: RoleData[]; errors: string[] } => {
    const errors: string[] = []
    const valid: RoleData[] = []

    importedRoles.forEach((role, index) => {
        // Check for duplicate codes
        const duplicateCode = existingRoles.find((r) => r.code === role.code)
        if (duplicateCode) {
            errors.push(`Role "${role.name}" (index ${index}): Code "${role.code}" already exists`)
            return
        }

        // Validate permissions
        const invalidPermissions = role.permissions.filter(
            (perm) => !Object.values(Permission).includes(perm as Permission)
        )
        if (invalidPermissions.length > 0) {
            errors.push(
                `Role "${role.name}" (index ${index}): Invalid permissions: ${invalidPermissions.join(', ')}`
            )
            return
        }

        // Create valid role data
        valid.push({
            ...role,
            id: `imported-${Date.now()}-${index}`, // Temporary ID, will be replaced by backend
            userCount: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        } as RoleData)
    })

    return { valid, errors }
}
