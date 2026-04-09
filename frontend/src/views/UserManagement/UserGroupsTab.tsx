'use client'

import React, { useState } from 'react'
import { Users, Plus, Edit, Trash2, Download, Upload, FileSpreadsheet, X } from 'lucide-react'
import { UserGroup, PREDEFINED_USER_GROUPS, MOCK_USERS, UserRole, UserStatus } from '@src/data/users'
import { Modal } from '@src/components/custom/modal/modal'

const UserGroupsTab: React.FC = () => {
    const [showCreateGroupModal, setShowCreateGroupModal] = useState(false)
    const [showImportModal, setShowImportModal] = useState(false)
    const [customGroups, setCustomGroups] = useState<UserGroup[]>([])
    const [selectedGroup, setSelectedGroup] = useState<UserGroup | null>(null)
    const [groupFormData, setGroupFormData] = useState<{
        name: string
        description: string
        criteria: {
            company: string[]
            role: UserRole[]
            department: string[]
            status: UserStatus[]
            tags: string[]
        }
    }>({
        name: '',
        description: '',
        criteria: {
            company: [],
            role: [],
            department: [],
            status: [],
            tags: [],
        },
    })

    const allGroups = [...PREDEFINED_USER_GROUPS, ...customGroups]

    const handleCreateGroup = () => {
        if (!groupFormData.name.trim()) return

        const newGroup: UserGroup = {
            id: `custom-${Date.now()}`,
            name: groupFormData.name,
            description: groupFormData.description,
            type: 'Custom',
            memberIds: [], // TODO: Calculate based on criteria
            criteria: {
                company: groupFormData.criteria.company.length > 0 ? groupFormData.criteria.company : undefined,
                role: groupFormData.criteria.role.length > 0 ? groupFormData.criteria.role : undefined,
                department: groupFormData.criteria.department.length > 0 ? groupFormData.criteria.department : undefined,
                status: groupFormData.criteria.status.length > 0 ? groupFormData.criteria.status : undefined,
                tags: groupFormData.criteria.tags.length > 0 ? groupFormData.criteria.tags : undefined,
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }

        setCustomGroups([...customGroups, newGroup])
        setShowCreateGroupModal(false)
        setGroupFormData({
            name: '',
            description: '',
            criteria: {
                company: [],
                role: [],
                department: [],
                status: [],
                tags: [],
            },
        })
    }

    const handleDeleteGroup = (group: UserGroup) => {
        if (group.type === 'Predefined') {
            alert('Predefined groups cannot be deleted')
            return
        }
        if (confirm(`Are you sure you want to delete the group "${group.name}"?`)) {
            setCustomGroups(customGroups.filter((g) => g.id !== group.id))
        }
    }

    const handleExportGroup = (group: UserGroup) => {
        const members = MOCK_USERS.filter((u) => group.memberIds.includes(u.id))
        const data = members.map((u) => ({
            'User ID': u.userId,
            'Name': `${u.firstName} ${u.lastName}`,
            'Email': u.email,
            'Company': u.companyName,
            'Role': u.role,
            'Status': u.status,
        }))
        // TODO: Implement actual export
        console.log('Exporting group:', data)
        alert(`Exporting ${members.length} users from ${group.name}`)
    }

    return (
        <div className="grid grid-cols-12 gap-x-space">
            {/* User Groups Management */}
            <div className="col-span-12 card">
                <div className="flex items-center justify-between card-header">
                    <h6 className="card-title">User Groups</h6>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setShowCreateGroupModal(true)}>
                        <Plus className="size-4 ltr:mr-2 rtl:ml-2" />
                        Create Custom Group
                    </button>
                </div>
                <div className="pt-0 card-body">
                    <div className="space-y-4">
                        {allGroups.map((group) => (
                            <div
                                key={group.id}
                                className="flex items-center justify-between p-4 border border-gray-200 dark:border-dark-700 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center size-10 rounded-lg bg-primary-100 dark:bg-primary-900/20">
                                        <Users className="size-5 text-primary-500" />
                                    </div>
                                    <div>
                                        <h6 className="font-medium">{group.name}</h6>
                                        <p className="text-sm text-gray-500 dark:text-dark-500">
                                            {group.description || `${group.memberIds.length} members`}
                                        </p>
                                        <span
                                            className={`badge ${
                                                group.type === 'Predefined'
                                                    ? 'badge-blue'
                                                    : 'badge-purple'
                                            } mt-1`}>
                                            {group.type}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        className="btn btn-sm btn-sub-primary"
                                        onClick={() => handleExportGroup(group)}>
                                        <Download className="size-4" />
                                    </button>
                                    {group.type === 'Custom' && (
                                        <>
                                            <button
                                                className="btn btn-sm btn-sub-primary"
                                                onClick={() => {
                                                    setSelectedGroup(group)
                                                    setGroupFormData({
                                                        name: group.name,
                                                        description: group.description || '',
                                                        criteria: {
                                                            company: group.criteria?.company || [],
                                                            role: group.criteria?.role || [],
                                                            department: group.criteria?.department || [],
                                                            status: group.criteria?.status || [],
                                                            tags: group.criteria?.tags || [],
                                                        },
                                                    })
                                                    setShowCreateGroupModal(true)
                                                }}>
                                                <Edit className="size-4" />
                                            </button>
                                            <button
                                                className="btn btn-sm btn-sub-red"
                                                onClick={() => handleDeleteGroup(group)}>
                                                <Trash2 className="size-4" />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bulk Operations */}
            <div className="col-span-12 card">
                <div className="card-header">
                    <h6 className="card-title">Bulk Operations</h6>
                </div>
                <div className="pt-0 card-body">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Bulk User Import */}
                        <div className="p-4 border border-gray-200 dark:border-dark-700 rounded-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex items-center justify-center size-10 rounded-lg bg-blue-100 dark:bg-blue-500/10">
                                    <Upload className="size-5 text-blue-500" />
                                </div>
                                <div>
                                    <h6 className="font-medium">Bulk User Import</h6>
                                    <p className="text-sm text-gray-500 dark:text-dark-500">
                                        Import users from CSV/Excel file
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <button
                                    type="button"
                                    className="btn btn-sub-primary w-full"
                                    onClick={() => setShowImportModal(true)}>
                                    <Upload className="size-4 ltr:mr-2 rtl:ml-2" />
                                    Upload CSV/Excel
                                </button>
                                <button type="button" className="btn btn-sub-primary w-full">
                                    <Download className="size-4 ltr:mr-2 rtl:ml-2" />
                                    Download Template
                                </button>
                            </div>
                        </div>

                        {/* Bulk Actions */}
                        <div className="p-4 border border-gray-200 dark:border-dark-700 rounded-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex items-center justify-center size-10 rounded-lg bg-purple-100 dark:bg-purple-500/10">
                                    <Users className="size-5 text-purple-500" />
                                </div>
                                <div>
                                    <h6 className="font-medium">Bulk Actions</h6>
                                    <p className="text-sm text-gray-500 dark:text-dark-500">
                                        Perform actions on multiple users
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <button type="button" className="btn btn-sm btn-sub-primary w-full">
                                    Bulk Role Assignment
                                </button>
                                <button type="button" className="btn btn-sm btn-sub-primary w-full">
                                    Bulk Status Change
                                </button>
                                <button type="button" className="btn btn-sm btn-sub-primary w-full">
                                    Bulk Notification
                                </button>
                                <button type="button" className="btn btn-sm btn-sub-primary w-full">
                                    Bulk Export
                                </button>
                                <button type="button" className="btn btn-sm btn-sub-red w-full">
                                    Bulk Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create/Edit Group Modal */}
            {showCreateGroupModal && (
                <Modal
                    isOpen={showCreateGroupModal}
                    onClose={() => {
                        setShowCreateGroupModal(false)
                        setSelectedGroup(null)
                        setGroupFormData({
                            name: '',
                            description: '',
                            criteria: {
                                company: [],
                                role: [],
                                department: [],
                                status: [],
                                tags: [],
                            },
                        })
                    }}
                    position="modal-center"
                    title={selectedGroup ? 'Edit Group' : 'Create Custom Group'}
                    id="createGroupModal"
                    size="modal-lg"
                    content={
                        <div className="space-y-4">
                            <div>
                                <label className="block mb-2 text-sm font-medium">
                                    Group Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={groupFormData.name}
                                    onChange={(e) =>
                                        setGroupFormData({ ...groupFormData, name: e.target.value })
                                    }
                                    placeholder="Enter group name"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium">Description</label>
                                <textarea
                                    className="form-textarea"
                                    rows={3}
                                    value={groupFormData.description}
                                    onChange={(e) =>
                                        setGroupFormData({ ...groupFormData, description: e.target.value })
                                    }
                                    placeholder="Enter group description"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium">Group Criteria</label>
                                <p className="mb-2 text-sm text-gray-500">
                                    Define criteria to automatically add users to this group
                                </p>
                                <div className="space-y-2">
                                    <div>
                                        <label className="block mb-1 text-xs font-medium">By Company</label>
                                        <select
                                            className="form-select"
                                            multiple
                                            value={groupFormData.criteria.company}
                                            onChange={(e) =>
                                                setGroupFormData({
                                                    ...groupFormData,
                                                    criteria: {
                                                        ...groupFormData.criteria,
                                                        company: Array.from(e.target.selectedOptions, (opt) => opt.value),
                                                    },
                                                })
                                            }>
                                            {Array.from(new Set(MOCK_USERS.map((u) => u.companyName))).map(
                                                (company) => (
                                                    <option key={company} value={company}>
                                                        {company}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>
                                    {/* Add more criteria fields as needed */}
                                </div>
                            </div>
                        </div>
                    }
                    footer={
                        <div className="flex justify-end gap-3">
                            <button
                                className="btn btn-sub-primary"
                                onClick={() => {
                                    setShowCreateGroupModal(false)
                                    setSelectedGroup(null)
                                }}>
                                Cancel
                            </button>
                            <button className="btn btn-primary" onClick={handleCreateGroup}>
                                {selectedGroup ? 'Update Group' : 'Create Group'}
                            </button>
                        </div>
                    }
                />
            )}

            {/* Import Modal */}
            {showImportModal && (
                <Modal
                    isOpen={showImportModal}
                    onClose={() => setShowImportModal(false)}
                    position="modal-center"
                    title="Bulk User Import"
                    id="importModal"
                    size="modal-lg"
                    content={
                        <div className="space-y-4">
                            <div>
                                <label className="block mb-2 text-sm font-medium">Upload File</label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="file"
                                        accept=".csv,.xlsx,.xls"
                                        className="form-input"
                                    />
                                    <button type="button" className="btn btn-sub-primary">
                                        <Download className="size-4 ltr:mr-2 rtl:ml-2" />
                                        Download Template
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="form-checkbox" />
                                    <span className="text-sm">Create new users only</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="form-checkbox" />
                                    <span className="text-sm">Update existing users</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="form-checkbox" />
                                    <span className="text-sm">Skip duplicates</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="form-checkbox" />
                                    <span className="text-sm">Send welcome emails</span>
                                </label>
                            </div>
                        </div>
                    }
                    footer={
                        <div className="flex justify-end gap-3">
                            <button
                                className="btn btn-sub-primary"
                                onClick={() => setShowImportModal(false)}>
                                Cancel
                            </button>
                            <button className="btn btn-primary">Import Users</button>
                        </div>
                    }
                />
            )}
        </div>
    )
}

export default UserGroupsTab

