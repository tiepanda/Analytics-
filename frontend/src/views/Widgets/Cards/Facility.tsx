'use client'

import React from 'react'


import { GalleryVerticalEnd, Headset, Shuffle, Truck } from 'lucide-react'

const facility = [
  {
    id: 1,
    icon: 'truck',
    title: 'Total Sales',
    status: [
      {
        count: 100,
        label: 'Active',
      },
    ],
    colorClass: 'bg-primary-500',
  },
  {
    id: 2,
    icon: 'gallery-vertical-end',
    title: 'Total Sales',
    status: [
      {
        count: 100,
        label: 'Active',
      },
    ],
    colorClass: 'bg-primary-500',
  },
  {
    id: 3,
    icon: 'headset',
    title: 'Total Sales',
    status: [
      {
        count: 100,
        label: 'Active',
      },
    ],
    colorClass: 'bg-primary-500',
  },
  {
    id: 4,
    icon: 'shuffle',
    title: 'Total Sales',
    status: [
      {
        count: 100,
        label: 'Active',
      },
    ],
    colorClass: 'bg-primary-500',
  },
]

const Facility = () => {
  const getLucideIcon = (icon: string, className: string) => {
    const icons: { [key: string]: React.ReactElement } = {
      truck: <Truck className={className} />,
      'gallery-vertical-end': <GalleryVerticalEnd className={className} />,
      headset: <Headset className={className} />,
      shuffle: <Shuffle className={className} />,
    }
    return icons[icon]
  }

  return (
    <React.Fragment>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-space">
        {facility.map((item, index) => (
          <div className="card" key={index}>
            <div className="card-body">
              <div className="flex items-center gap-3 p-3 mb-4 bg-gray-100 rounded-md dark:bg-dark-850">
                <div className="flex items-center justify-center text-xs rounded-md size-10">
                  {item.icon && getLucideIcon(item.icon, item.colorClass)}
                </div>
                <h6>{item.title}</h6>
              </div>
              <div className="grid grid-cols-2 gap-0 text-center divide-x divide-gray-200 dark:divide-dark-800 rtl:divide-x-reverse">
                {item.status.map((statusItem, index) => (
                  <div key={index}>
                    <h5>{statusItem.count}</h5>
                    <p className="text-gray-500 dark:text-dark-500">
                      {statusItem.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  )
}

export default Facility
