'use client'

import React from 'react'
import { DashboardBuilder } from '@src/components/dashboard-builder'
import { NextPageWithLayout } from '@src/dtos'

const DashboardBuilderPage: NextPageWithLayout = () => {
  return (
    <div className="flex h-full w-full">
      <DashboardBuilder
        config={{
          gridCols: 12,
          rowHeight: 60,
          margin: [12, 12],
          containerPadding: [0, 0],
          enableDragAndDrop: true,
          enableResize: true,
          enableTemplates: true,
          enableHistory: true,
          enableAutoArrange: true,
          theme: 'auto',
          backgroundColor: 'bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800',
          borderRadius: 8,
          shadow: 'shadow-lg',
          compactType: 'vertical',
          preventCollision: false,
          useCSSTransforms: true,
        }}
        widgetLibrary={{
          categories: ['charts', 'iiot', 'analytics'],
          showSearch: true,
          showCategories: true,
          maxWidgets: 50,
        }}
        topBar={{
          show: true,
          title: 'Dashboard Builder',
          showTemplateActions: true,
          showExportImport: true,
          showUndoRedo: true,
        }}
      />
    </div>
  )
}

export default DashboardBuilderPage

