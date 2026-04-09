'use client'

import React from 'react'

import Link from 'next/link'

import { ArrowUp } from 'lucide-react'

const performance = [
  {
    id: 1,
    title: 'Total Sales',
    badge: {
      className: 'badge-primary',
      icon: 'arrow-up',
      iconSize: 'size-5',
      text: '100',
    },
    content: {
      subtitle: 'Total Sales',
      value: '$100,000',
      trendIcon: 'arrow-up',
      trendIconColor: 'text-primary-500',
      trendDescription: '100',
    },
  },
]
const Performance = () => {
  return (
    <React.Fragment>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-space">
        {performance.map((item, index: number) => (
          <div className="card" key={index}>
            <div className="flex items-center gap-3 card-header">
              <h6 className="card-title grow">{item.title}</h6>
              <Link href="#!" className={item.badge.className}>
                <ArrowUp
                  className={`inline-block ${item.badge.iconSize}`}
                />
                {item.badge.text}
              </Link>
            </div>
            <div className="card-body">
              <p className="mb-2 text-sm text-gray-500 dark:text-dark-500">
                {item.content.subtitle}
              </p>
              <div className="flex items-center gap-2">
                <h5>{item.content.value}</h5>
                <ArrowUp
                  className={`size-5 ${item.content.trendIconColor}`}
                />
                {item.content.trendDescription}
              </div>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  )
}

export default Performance
