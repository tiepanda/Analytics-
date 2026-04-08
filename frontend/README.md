# 🏭 Eagle Analytics - Industrial IoT Analytics Platform

<div align="center">

![Eagle Analytics](https://img.shields.io/badge/Eagle%20Analytics-v2.2.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.16-38bdf8)
![License](https://img.shields.io/badge/license-Commercial-green)

**A comprehensive, multi-tenant Industrial IoT analytics platform for manufacturing operations**

[Features](#-key-features) • [Getting Started](#-getting-started) • [Documentation](#-documentation) • [Architecture](#-architecture) • [Support](#-support)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Core Modules](#-core-modules)
- [Architecture](#-architecture)
- [Configuration](#-configuration)
- [Development](#-development)
- [Deployment](#-deployment)
- [Documentation](#-documentation)
- [Support](#-support)

---

## 🎯 Overview

**Eagle Analytics** is a next-generation Industrial IoT (IIoT) analytics platform built with Next.js 16 and React 19, designed to transform manufacturing operations through real-time monitoring, advanced analytics, and intelligent insights. The platform provides complete visibility into production processes, enabling data-driven decision-making and operational excellence.

### 🎪 Platform Highlights

- **🏢 Multi-Tenant Architecture**: Support for 100+ manufacturing companies with complete data isolation
- **🔐 5-Tier RBAC System**: SuperAdmin, Admin, Manager, Operator, and Viewer roles with granular permissions
- **📊 Real-Time Monitoring**: Live machine status, OEE tracking, energy consumption, and production analytics
- **🎨 Drag-and-Drop Dashboard Builder**: Customizable analytics dashboards with 10+ widget types
- **🌍 Multi-Language Support**: 14+ languages with i18next integration
- **🎨 Modern UI/UX**: Responsive design with dark/light themes and advanced animations
- **📈 Advanced Analytics**: Production metrics, quality control, predictive maintenance, and cost optimization

---

## ✨ Key Features

### 🚀 Core Platform Features

#### **Production Management**
- Real-time production monitoring and tracking
- Job creation and work order management
- Resource allocation and capacity planning
- Material planning and inventory integration
- Production cost estimation and tracking

#### **OEE Monitoring** (Overall Equipment Effectiveness)
- Real-time OEE calculation (Availability × Performance × Quality)
- Production vs. schedule analysis
- Customer-wise and model-wise production tracking
- Loading/unloading efficiency analysis
- Trend analysis and performance alerts

#### **Energy Management**
- Plant-wide energy consumption monitoring
- Machine-level energy tracking
- Real-time energy efficiency metrics
- Cost analysis and optimization recommendations
- Alert system for consumption thresholds

#### **Machine Monitoring**
- Real-time machine status tracking
- Live performance metrics
- Predictive maintenance alerts
- Machine health monitoring
- Downtime analysis and reporting

#### **Quality Control**
- Real-time quality inspection tracking
- Non-conformance (NC) management
- Quality metrics and trend analysis
- Defect tracking and corrective actions
- Inspection scheduling and reporting

#### **Dashboard Builder**
- Drag-and-drop widget placement
- 12-column responsive grid layout
- 10+ pre-built analytics widgets
- Template save/load system
- Export/import functionality
- Auto-arrangement and optimization

### 🎨 User Experience Features

- **Modern Landing Page**: Advanced animations with Framer Motion
- **Interactive Elements**: Splash cursor, tech background effects
- **Responsive Design**: Mobile-first approach across all devices
- **Theme System**: Seamless dark/light mode switching
- **Internationalization**: 14 languages (English, Spanish, French, German, Chinese, etc.)
- **Accessibility**: WCAG 2.1 compliant with keyboard navigation

---

## 🛠️ Technology Stack

### **Frontend Framework**
```typescript
Next.js 16.0.1          // React framework with App Router
React 19.2.0            // UI library with concurrent features
TypeScript 5.9.3        // Type-safe development
TailwindCSS 4.1.16      // Utility-first CSS framework
```

### **State Management**
```typescript
@tanstack/react-query   // Server state management
Redux Toolkit 2.9.2     // Client state management
Zustand 5.0.8           // Lightweight state for dashboards
React Hook Form 7.65    // Form state management
```

### **UI Components & Styling**
```typescript
Radix UI                // Headless UI primitives
PixeleyeZUI 1.0.3       // Custom UI component library
Framer Motion 12.23     // Animation library
Lucide React            // Icon library (500+ icons)
class-variance-authority // Component variants
tailwind-merge          // Tailwind class merging
```

### **Data Visualization**
```typescript
ApexCharts 5.3.5        // Interactive charts
ECharts 6.0.0           // Enterprise charting library
Recharts 3.3.0          // Composable charting
AG Grid 34.3.1          // Advanced data tables
```

### **Backend Integration**
```typescript
Axios 1.13.1            // HTTP client
.NET 9.0 API            // Backend REST API
PostgreSQL 12+          // Primary database
Redis                   // Caching layer
```

### **Development Tools**
```typescript
ESLint 9.38             // Code linting
Prettier 3.6            // Code formatting
Jest 30.2               // Testing framework
TypeScript              // Type checking
```

---

## 🚀 Getting Started

### Prerequisites

```bash
Node.js 18+             # Required
npm or yarn             # Package manager
Git                     # Version control
```

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd eagle-analytics/apps/frontend

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local

# 4. Start development server
npm run dev

# 5. Open browser
http://localhost:3000
```

### Environment Configuration

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_IS_API_ACTIVE=false  # Set to true for production
```

### Quick Start Commands

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm start           # Start production server
npm run lint        # Run ESLint
npm run lint:fix    # Fix ESLint errors
npm test            # Run tests
npm run type-check  # TypeScript type checking
```

---

## 📁 Project Structure

**Key Directories:**

```
src/
├── app/                          # Next.js App Router (Pages)
│   ├── (layout)/                 # Protected routes with layout
│   │   ├── dashboard/           # Main dashboard
│   │   ├── oee/                 # OEE monitoring module
│   │   ├── energy/              # Energy management
│   │   ├── dashboard-builder/   # Dashboard builder
│   │   └── page/user/           # User management
│   ├── (non-layout)/            # Public routes without layout
│   │   ├── auth/login/          # Login page
│   │   └── landing/             # Landing page
│   └── layout.tsx               # Root layout
├── components/                   # UI Components
│   ├── auth/                    # Authentication components
│   ├── common/                  # Shared components
│   ├── dashboard-builder/       # Dashboard builder components
│   ├── landing/                 # Landing page components
│   ├── layout/                  # Layout components
│   ├── ui/                      # 40+ UI primitives
│   └── widgets/                 # Dashboard widgets
├── contexts/                    # React contexts
│   └── AuthContext.tsx          # Authentication context
├── data/                        # Mock data & configuration
│   ├── eagleAnalytics/          # Eagle Analytics data
│   └── Sidebar/menu.ts          # Navigation menu
├── dtos/                        # TypeScript interfaces
├── hooks/                       # Custom React hooks
│   └── queries/                 # TanStack Query hooks
├── lib/                         # Core utilities
│   ├── auth.ts                  # Authentication service
│   ├── rbac.ts                  # Role-based access control
│   ├── queryClient.ts           # TanStack Query client
│   └── utils.ts                 # Utility functions
├── slices/                      # Redux state management
│   └── layout/                  # Layout state
├── store/                       # Zustand stores
│   └── dashboardStore.ts        # Dashboard state
├── styles/                      # CSS stylesheets
│   └── globals.css              # Global styles
├── types/                       # TypeScript type definitions
└── utils/                       # Utility functions
    ├── axios_api.ts             # API client
    ├── crud_functions.ts        # CRUD utilities
    └── ValidationFormate.ts     # Validation helpers
```

---

## 🎛️ Core Modules

### 1. **OEE Module** (Overall Equipment Effectiveness)

**Purpose**: Monitor and analyze equipment effectiveness to optimize production performance.

**Features:**
- Real-time OEE calculation (Availability × Performance × Quality)
- Production vs. schedule analysis with interactive charts
- Customer-wise and model-wise production tracking
- Loading/unloading time management
- Historical trend analysis and performance alerts
- Export capabilities for reporting

**Components:**
- Dashboard with real-time metrics
- Loading/Unloading efficiency tracker
- Performance comparison charts
- Alert management system

### 2. **Energy Module**

**Purpose**: Monitor and optimize energy consumption across plants and machines.

**Features:**
- Plant-wide energy dashboard
- Machine-wise energy consumption tracking
- Real-time monitoring with historical trends
- Energy efficiency metrics and benchmarks
- Cost analysis and optimization recommendations
- Threshold-based alert system

**Components:**
- Plant overview dashboard
- Machine-wise consumption analysis
- Energy monitoring configuration
- Cost tracking and reporting

### 3. **Machine Module**

**Purpose**: Real-time machine monitoring and performance analysis.

**Features:**
- Live machine status tracking
- Performance metrics dashboard
- Predictive maintenance alerts
- Machine health monitoring
- Downtime analysis and reporting
- Multi-machine comparison

### 4. **Production Module**

**Purpose**: Comprehensive production planning and execution.

**Features:**
- Job creation and work order management
- Resource allocation and scheduling
- Real-time production tracking
- Quality inspection integration
- Production completion reporting
- Cost estimation and tracking

### 5. **Dashboard Builder**

**Purpose**: Create custom analytics dashboards with drag-and-drop functionality.

**Features:**
- 12-column responsive grid layout
- 10+ pre-built widget types
- Drag-and-drop widget placement
- Template save/load system
- Export/import JSON functionality
- Auto-arrangement algorithms
- Undo/redo with history

**Available Widgets:**
- Bar Chart, Line Chart, Area Chart
- Machine Status Monitor
- Production Metrics
- OEE Monitor
- Energy Consumption
- Temperature Monitor
- Production Counter
- System Alerts

---

## 🏗️ Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Presentation Layer                    │
│   Next.js Web App • Mobile Interface • IoT Gateway      │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                   API Gateway Layer                     │
│   Authentication • Rate Limiting • Load Balancing       │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                  Application Layer                      │
│   Production Service • Analytics • Notifications        │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                 Business Logic Layer                    │
│   Core Rules • Validations • Calculations               │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                  Data Access Layer                      │
│   Repository Pattern • CRUD Operations                  │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                  Data Storage Layer                     │
│   PostgreSQL • Redis Cache • File Storage               │
└─────────────────────────────────────────────────────────┘
```

### Multi-Tenant Architecture

- **Tenant Isolation**: Company-based data separation
- **Role-Based Access Control**: 5-tier permission system
- **Data Encryption**: AES-256 encryption at rest
- **Audit Logging**: Complete activity tracking
- **Scalability**: Horizontal scaling support

### Authentication Flow

```typescript
1. User Login → JWT Token Generation
2. Token Storage → LocalStorage (secure)
3. API Requests → Bearer Token Authentication
4. Token Refresh → Automatic refresh on 401
5. Logout → Token Invalidation
```

---

## ⚙️ Configuration

### TypeScript Configuration

**Path Aliases:**
```typescript
@/*         → src/*
@assets/*   → src/assets/*
@views/*    → src/views/*
@dtos/*     → src/dtos/*
@custom/*   → src/components/custom/*
```

### TailwindCSS Configuration

**Custom Theme:**
```typescript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: { /* color scale */ },
      sidebar: { /* sidebar colors */ },
    }
  }
}
```

### API Configuration

```typescript
// src/utils/axios_api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
const IS_API_ACTIVE = process.env.NEXT_PUBLIC_IS_API_ACTIVE === 'true'
```

---

## 💻 Development

### Development Workflow

```bash
# 1. Create feature branch
git checkout -b feature/your-feature

# 2. Make changes and test
npm run dev

# 3. Run linting and type checking
npm run lint:fix
npm run type-check

# 4. Run tests
npm test

# 5. Commit changes
git commit -m "feat: your feature description"

# 6. Push and create PR
git push origin feature/your-feature
```

### Code Quality Tools

```bash
npm run lint              # ESLint code analysis
npm run lint:fix          # Auto-fix ESLint errors
npm run prettier:write    # Format code with Prettier
npm run type-check        # TypeScript type checking
npm run test              # Run Jest tests
npm run test:coverage     # Test coverage report
```

### Adding New Features

**1. Create Component:**
```typescript
// src/components/your-feature/YourComponent.tsx
import React from 'react'

export function YourComponent() {
  return <div>Your Component</div>
}
```

**2. Add Route:**
```typescript
// src/app/(layout)/your-route/page.tsx
import { YourComponent } from '@/components/your-feature/YourComponent'

export default function YourPage() {
  return <YourComponent />
}
```

**3. Update Navigation:**
```typescript
// src/data/Sidebar/menu.ts
{
  title: 'Your Feature',
  icon: 'your-icon',
  link: '/your-route',
}
```

---

## 🚀 Deployment

### Build for Production

```bash
# Build application
npm run build

# Start production server
npm start

# Or use PM2 for process management
pm2 start npm --name "eagle-analytics" -- start
```

### Environment Variables (Production)

```bash
NEXT_PUBLIC_API_URL=https://api.yourcompany.com/api
NEXT_PUBLIC_IS_API_ACTIVE=true
NEXT_PUBLIC_APP_URL=https://yourcompany.com
```

### Deployment Options

#### **Vercel (Recommended)**
```bash
npm i -g vercel
vercel --prod
```

#### **Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

#### **Static Export**
```javascript
// next.config.mjs
module.exports = {
  output: 'export',
  trailingSlash: true,
}
```

### Performance Optimization

- **Code Splitting**: Automatic with Next.js
- **Image Optimization**: Next.js Image component
- **Caching**: Redis for API responses
- **Bundle Analysis**: `@next/bundle-analyzer`
- **Lazy Loading**: Dynamic imports for heavy components

---

## 📚 Documentation

### Available Documentation

- **[Comprehensive PRD](docs/COMPREHENSIVE_PRD.md)** - Product requirements and specifications
- **[Developer Guide](docs/EAGLE_ANALYTICS_DEVELOPER_GUIDE.md)** - Complete development guide
- **[Project Guide](docs/EAGLE_ANALYTICS_PROJECT_GUIDE.md)** - Project setup and customization
- **[Project Analysis](docs/COMPREHENSIVE_PROJECT_ANALYSIS.md)** - Technical architecture analysis
- **[Layout Configuration](docs/LAYOUT_CONFIG.md)** - Layout system documentation
- **[TanStack Query Guide](docs/TANSTACK_QUERY_GUIDE.md)** - Data fetching patterns

### External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [TanStack Query Documentation](https://tanstack.com/query)
- [Radix UI Documentation](https://www.radix-ui.com/docs)

---

## 🔐 User Roles & Permissions

### Role Hierarchy

| Role | Access Level | Key Permissions |
|------|--------------|------------------|
| **SuperAdmin** | System-wide | Tenant management, global configuration, all modules |
| **Admin** | Company-level | User management, company configuration, all modules |
| **Manager** | Department-level | Team oversight, reporting, production management |
| **Operator** | Machine-level | Data entry, machine operation, basic monitoring |
| **Viewer** | Read-only | Dashboard viewing, report access |

### Permission Categories

- Dashboard Access (View, Edit)
- OEE Monitoring (View, Edit, Configure)
- Energy Management (View, Edit, Configure)
- Machine Monitoring (View, Edit, Operate)
- Production Management (View, Edit, Create, Delete)
- Quality Control (View, Edit, Inspect)
- Reports (View, Export, Generate)
- User Management (View, Create, Edit, Delete)
- Company Management (View, Edit, Configure)
- System Administration (All)

---

## 🤝 Support

### Getting Help

- **Documentation**: Check the `/docs` folder for detailed guides
- **Issues**: Report bugs and request features via issue tracker
- **Community**: Join our community forums for discussions
- **Email**: support@eagle-analytics.com

### Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### License

Commercial License - See LICENSE file for details

---

## 🎯 Roadmap

### Current Version (v2.2.0)
- ✅ Multi-tenant architecture
- ✅ 5-tier RBAC system
- ✅ Dashboard builder
- ✅ OEE monitoring
- ✅ Energy management
- ✅ Machine monitoring
- ✅ 14 language support

### Upcoming Features
- 🔄 Real-time WebSocket integration
- 🔄 Advanced predictive analytics
- 🔄 Mobile application (React Native)
- 🔄 Custom report builder
- 🔄 API marketplace for integrations
- 🔄 AI-powered insights
- 🔄 Blockchain-based audit logs

---

## 📊 Performance Metrics

- **Load Time**: < 3 seconds for dashboard
- **API Response**: < 2 seconds average
- **Real-time Updates**: < 1 second latency
- **Concurrent Users**: 1000+ supported
- **Uptime**: 99.9% target
- **Bundle Size**: Optimized with code splitting

---

<div align="center">

**Built with ❤️ by the Eagle Analytics Team**

© 2024 Eagle Analytics. All rights reserved.

</div>
