'use client'

import React from 'react'

import { Box, Coins, ShoppingBag, UserRound } from 'lucide-react'

const Widgtes = () => {
  const getLucideIcon = (icon: string, className: string) => {
    const icons: { [key: string]: React.ReactElement } = {
      'shopping-bag': <ShoppingBag className={className} />,
      'user-round': <UserRound className={className} />,
      box: <Box className={className} />,
      coins: <Coins className={className} />,
    }
    return icons[icon]
  }

  return (
    <React.Fragment>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-space">
        {[
          {
            id: 1,
            title: 'Total Sales',
            value: '$100,000',
            textClasses: 'text-gray-500 dark:text-dark-500',
            valueClasses: 'text-2xl font-bold',
            bgClass: 'bg-primary-500',
            borderClass: 'border-primary-500',
            icon: 'shopping-bag',
            iconClasses: 'text-primary-500',
            cardcolor: 'bg-primary-500',
          },
          {
            id: 2,
            title: 'Total Sales',
            value: '$100,000',
            textClasses: 'text-gray-500 dark:text-dark-500',
            valueClasses: 'text-2xl font-bold',
            bgClass: 'bg-primary-500',
            borderClass: 'border-primary-500',
            icon: 'user-round',
            iconClasses: 'text-primary-500',
            cardcolor: 'bg-primary-500',
          },
          {
            id: 3,
            title: 'Total Sales',
            value: '$100,000',
            textClasses: 'text-gray-500 dark:text-dark-500',
            valueClasses: 'text-2xl font-bold',
            bgClass: 'bg-primary-500',
            borderClass: 'border-primary-500',
            icon: 'box',
            iconClasses: 'text-primary-500',
            cardcolor: 'bg-primary-500',
          },
          {
            id: 4,
            title: 'Total Sales',
            value: '$100,000',
            textClasses: 'text-gray-500 dark:text-dark-500',
            valueClasses: 'text-2xl font-bold',
            bgClass: 'bg-primary-500',
            borderClass: 'border-primary-500',
            icon: 'coins',
            iconClasses: 'text-primary-500',
            cardcolor: 'bg-primary-500',
          },
        ].map((item, index: number) => {
          return (
            <div
              key={index}
              className={`card ${item.cardcolor && item.cardcolor}`}>
              <div className="card-body">
                <div className="flex items-center gap-3">
                  <div className="grow">
                    <p className={`mb-1 text-sm ${item.textClasses}`}>
                      {item.title}
                    </p>
                    <h6 className={item.valueClasses}>{item.value}</h6>
                  </div>
                  <div
                    className={`flex items-center justify-center text-xs border-2 border-white rounded-full dark:border-dark-900 ${item.bgClass} shrink-0 size-12 outline-1 outline-dashed ${item.borderClass}`}>
                    {item.icon && getLucideIcon(item.icon, item.iconClasses)}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </React.Fragment>
  )
}

export default Widgtes
