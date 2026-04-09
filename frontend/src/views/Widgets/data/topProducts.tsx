'use client'

import React, { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import {
  Dropdown,
  DropdownButton,
  DropdownMenu,
} from '@src/components/custom/dropdown/dropdown'

const TopProducts = () => {
  const [topProducts] = useState< { productName: string; salesUnit: string; price: string; stock: string; revenue: string; rating: number; image: string; }[]>([
    {
      productName: 'Product 1',
      salesUnit: '100',
      price: '$100',
      stock: '100',
      revenue: '$100',
      rating: 5,
      image: 'https://via.placeholder.com/150',
    },
    {
      productName: 'Product 2',
      salesUnit: '200',
      price: '$200',
      stock: '200',
      revenue: '$200',
      rating: 4,
      image: 'https://via.placeholder.com/150',
    },
    {
      productName: 'Product 3',
      salesUnit: '300',
      price: '$300',
      stock: '300',
      revenue: '$300',
      rating: 3,
      image: 'https://via.placeholder.com/150',
    },
    {
      productName: 'Product 4',
      salesUnit: '400',
      price: '$400',
      stock: '400',
      revenue: '$400',
      rating: 2,
      image: 'https://via.placeholder.com/150',
    },
    {
      productName: 'Product 5',
      salesUnit: '500',
      price: '$500',
      stock: '500',
      revenue: '$500',
      rating: 1,
      image: 'https://via.placeholder.com/150',
    },
  ])
  const [open, setOpen] = useState(false)
  return (
    <div className="col-span-12 xl:col-span-6 card">
      <div className="flex items-center card-header">
        <h6 className="card-title grow">Top Products</h6>
        <Dropdown position="" trigger="click">
          <DropdownButton colorClass="flex px-3 py-1.5 text-xs border-gray-200 dark:border-dark-800 link link-primary btn">
            Filters
            <svg
              className={`transition-transform duration-300 size-4 ${open ? 'transform rotate-180' : ''}`}
              viewBox="0 0 20 20"
              fill="currentColor"
              onClick={() => setOpen(!open)}>
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </DropdownButton>
          <DropdownMenu>
            <Link href="#!" className="dropdown-item ">
              <span>Last Week</span>
            </Link>

            <Link href="#!" className="dropdown-item ">
              <span>Last Month</span>
            </Link>
            <Link href="#!" className="dropdown-item">
              <span>Last Years</span>
            </Link>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="card-body">
        <div className="overflow-x-auto">
          <table className="table flush">
            <thead>
              <tr className="bg-gray-100 dark:bg-dark-850">
                <th className="whitespace-nowrap !font-medium text-gray-500 dark:text-dark-500">
                  Product
                </th>
                <th className="whitespace-nowrap !font-medium text-gray-500 dark:text-dark-500">
                  Sales
                </th>
                <th className="whitespace-nowrap !font-medium text-gray-500 dark:text-dark-500">
                  Price Unit
                </th>
                <th className="whitespace-nowrap !font-medium text-gray-500 dark:text-dark-500">
                  Stock
                </th>
                <th className="whitespace-nowrap !font-medium text-gray-500 dark:text-dark-500">
                  Revenue
                </th>
                <th className="whitespace-nowrap !font-medium text-gray-500 dark:text-dark-500">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={index} className="*:px-3 *:py-2.5">
                  <td className="whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center p-1 border border-gray-200 rounded-sm size-9 dark:border-dark-800">
                        <Image
                          src={product.image}
                          alt={product.productName}
                          className="rounded-sm"
                        />
                      </div>
                      <h6>{product.productName}</h6>
                    </div>
                  </td>
                  <td className="whitespace-nowrap">{product.salesUnit}</td>
                  <td className="whitespace-nowrap">{product.price}</td>
                  <td className="whitespace-nowrap">{product.stock}</td>
                  <td className="whitespace-nowrap">{product.revenue}</td>
                  <td className="whitespace-nowrap">
                    <i className="text-yellow-500 ri-star-line"></i>
                    <span className="text-gray-500 align-middle dark:text-dark-500">
                      {product.rating}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TopProducts
