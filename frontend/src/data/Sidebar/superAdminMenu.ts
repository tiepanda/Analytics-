import {
    Home,
    Building2,
    CreditCard,
    Settings,
    Shield,
    Menu,
    BarChart3,
    Bell,
    Globe,
    Zap,
    Lock,
    BookOpen,
    DollarSign,
    PieChart,
    Layout,
    HelpCircle,
    Users,
} from 'lucide-react'

export interface SuperAdminMenuItem {
    icon: typeof Home
    label: string
    href: string
    section: string
    submenu?: { label: string; href: string }[]
}

export const SUPER_ADMIN_MENU: SuperAdminMenuItem[] = [
    { icon: Home, label: 'Dashboard', href: '/super-admin', section: 'dashboard' },
    { icon: Building2, label: 'Company Management', href: '/super-admin/companies', section: 'companies' },
    { icon: CreditCard, label: 'License Management', href: '/super-admin/licenses', section: 'licenses' },
    { icon: Settings, label: 'System Configuration', href: '/super-admin/system-configuration', section: 'config' },
    { icon: Shield, label: 'Roles & Permissions', href: '/super-admin/roles', section: 'roles' },
    { icon: Users, label: 'User Management', href: '/super-admin/user-management', section: 'users' },
    { icon: Menu, label: 'Menu Management', href: '/super-admin/menu-management', section: 'menu' },
    { icon: BarChart3, label: 'Monitoring & Logs', href: '/super-admin/monitoring', section: 'monitoring' },
    { icon: Bell, label: 'Notifications', href: '/super-admin/notifications', section: 'notifications' },
    { icon: Globe, label: 'Languages', href: '/super-admin/languages', section: 'languages' },
    { icon: Zap, label: 'Device Management', href: '/super-admin/devices', section: 'devices' },
    {
        icon: Lock,
        label: 'Security & Compliance',
        section: 'security',
        href: '/super-admin/security',
        submenu: [
            { label: 'Security Policies', href: '/super-admin/security/policies' },
            { label: 'Compliance Reports', href: '/super-admin/security/compliance' },
            { label: 'Audit Logs', href: '/super-admin/security/audit' },
        ],
    },
    {
        icon: BookOpen,
        label: 'Template Library',
        section: 'templates',
        href: '/super-admin/templates',
        submenu: [
            { label: 'Email Templates', href: '/super-admin/templates/email' },
            { label: 'Report Templates', href: '/super-admin/templates/reports' },
            { label: 'Dashboard Templates', href: '/super-admin/templates/dashboards' },
        ],
    },
    {
        icon: DollarSign,
        label: 'Billing & Subscriptions',
        section: 'billing',
        href: '/super-admin/billing',
        submenu: [
            { label: 'Subscription Plans', href: '/super-admin/billing/plans' },
            { label: 'Invoices', href: '/super-admin/billing/invoices' },
            { label: 'Payment Methods', href: '/super-admin/billing/payments' },
        ],
    },
    {
        icon: PieChart,
        label: 'Menu Analytics',
        section: 'menu-analytics',
        href: '/super-admin/analytics',
        submenu: [
            { label: 'Usage Statistics', href: '/super-admin/analytics/usage' },
            { label: 'Popular Menus', href: '/super-admin/analytics/popular' },
            { label: 'User Behavior', href: '/super-admin/analytics/behavior' },
        ],
    },
    {
        icon: Layout,
        label: 'Dashboard Builder',
        section: 'dashboard-builder',
        href: '/super-admin/builder',
        submenu: [
            { label: 'Create Dashboard', href: '/super-admin/builder/create' },
            { label: 'Manage Dashboards', href: '/super-admin/builder/manage' },
            { label: 'Widget Library', href: '/super-admin/builder/widgets' },
        ],
    },
    { icon: BarChart3, label: 'Reports & Analytics', href: '/super-admin/reports', section: 'reports' },
    { icon: HelpCircle, label: 'Support & Feedback', href: '/super-admin/support', section: 'support' },
]

