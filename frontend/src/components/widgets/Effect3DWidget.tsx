'use client'

import React from 'react'
import TiltCard from '@src/views/UiAdvanced/uiAdvanced3d/tiltCard'
import { BaseWidget } from './BaseWidget'

interface Effect3DWidgetProps {
  id: string
  title?: string
  config?: {
    gradient?: string
    options?: {
      max?: number
      speed?: number
      glare?: boolean
      reverse?: boolean
      reset?: boolean
      fullPageListening?: boolean
      scale?: number
      startX?: number
      startY?: number
      axis?: 'x' | 'y'
    }
  }
}

export function Effect3DWidget({ id, title, config }: Effect3DWidgetProps) {
  const defaultOptions = {
    max: 25,
    speed: 400,
    glare: true,
    'max-glare': 0.8,
  }

  const options = { ...defaultOptions, ...(config?.options || {}) }
  const gradientClass = config?.gradient || 'bg-gradient-to-br from-primary-500 via-purple-500 to-sky-500'

  return (
    <BaseWidget id={id} title={title || '3D Effect Card'}>
      <div className="h-full flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-xs">
          <TiltCard
            options={options}
            className={`${gradientClass} rounded-lg shadow-lg h-32 flex items-center justify-center`}
          >
            <div className="text-center text-white">
              <div className="text-2xl font-bold mb-2">3D</div>
              <div className="text-sm opacity-90">Interactive Card</div>
            </div>
          </TiltCard>
        </div>
        <div className="text-center mt-2 text-xs text-gray-500 dark:text-gray-400">
          Hover to see 3D effect
        </div>
      </div>
    </BaseWidget>
  )
}
