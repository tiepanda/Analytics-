'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, ChevronRight, Folder, File } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@src/components/ui/dialog'
import { MegaMenu, MainMenu, SubMenu } from '@src/dtos'
import { cn } from '@/lib/utils'

interface MenuSearchModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  menu: MegaMenu[]
}

interface SearchResult {
  type: 'mega' | 'main' | 'sub'
  title: string
  link: string
  path: string[]
  item: MegaMenu | MainMenu | SubMenu
}

const MenuSearchModal: React.FC<MenuSearchModalProps> = ({
  open,
  onOpenChange,
  menu,
}) => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isMac, setIsMac] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Detect if user is on Mac
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.userAgent.toUpperCase().indexOf('MAC') >= 0)
    }
  }, [])

  // Search through menu items
  const searchMenuItems = useCallback(
    (query: string): SearchResult[] => {
      if (!query.trim()) return []

      const queryLower = query.toLowerCase()
      const searchResults: SearchResult[] = []

      menu.forEach((megaItem) => {
        // Skip separators
        if (megaItem.separator) return

        // Search MegaMenu level
        const megaMatch =
          megaItem.title.toLowerCase().includes(queryLower) ||
          megaItem.lang.toLowerCase().includes(queryLower)

        if (megaMatch && megaItem.link && megaItem.link !== '#') {
          searchResults.push({
            type: 'mega',
            title: megaItem.title,
            link: megaItem.link,
            path: [megaItem.title],
            item: megaItem,
          })
        }

        // Search MainMenu level (children)
        megaItem.children?.forEach((mainItem) => {
          const mainMatch =
            mainItem.title.toLowerCase().includes(queryLower) ||
            mainItem.lang.toLowerCase().includes(queryLower)

          if (mainMatch && mainItem.link && mainItem.link !== '#') {
            searchResults.push({
              type: 'main',
              title: mainItem.title,
              link: mainItem.link,
              path: [megaItem.title, mainItem.title],
              item: mainItem,
            })
          }

          // Search SubMenu level (grandchildren)
          mainItem.children?.forEach((subItem) => {
            const subMatch =
              subItem.title.toLowerCase().includes(queryLower) ||
              subItem.lang.toLowerCase().includes(queryLower)

            if (subMatch && subItem.link && subItem.link !== '#') {
              searchResults.push({
                type: 'sub',
                title: subItem.title,
                link: subItem.link,
                path: [megaItem.title, mainItem.title, subItem.title],
                item: subItem,
              })
            }
          })
        })
      })

      return searchResults
    },
    [menu]
  )

  // Update results when search query changes
  useEffect(() => {
    const searchResults = searchMenuItems(searchQuery)
    setResults(searchResults)
    setSelectedIndex(0)
  }, [searchQuery, searchMenuItems])

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
      setSearchQuery('')
      setResults([])
      setSelectedIndex(0)
    }
  }, [open])

  // Handle keyboard navigation
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        )
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0))
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault()
        handleSelectResult(results[selectedIndex])
      } else if (e.key === 'Escape') {
        onOpenChange(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, results, selectedIndex, onOpenChange])

  // Scroll selected item into view
  useEffect(() => {
    if (resultsRef.current && selectedIndex >= 0) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        })
      }
    }
  }, [selectedIndex])

  const handleSelectResult = (result: SearchResult) => {
    if (result.link && result.link !== '#') {
      router.push(result.link)
      onOpenChange(false)
      setSearchQuery('')
    }
  }

  const getIcon = (type: 'mega' | 'main' | 'sub') => {
    switch (type) {
      case 'mega':
        return <Folder className="size-4" />
      case 'main':
        return <File className="size-4" />
      case 'sub':
        return <ChevronRight className="size-4" />
      default:
        return <File className="size-4" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl bg-white dark:bg-gray-800">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
            Search Menus
          </DialogTitle>
        </DialogHeader>

        {/* Search Input */}
        <div className="px-6 pt-4 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 dark:text-gray-500" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search menus and sub-menus..."
              className="w-full h-12 pl-10 pr-10 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="px-6 pb-6 max-h-[400px] overflow-y-auto" ref={resultsRef}>
          {searchQuery && results.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">No results found for "{searchQuery}"</p>
            </div>
          )}

          {!searchQuery && (
            <div className="py-8 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Start typing to search menus...</p>
              <p className="text-xs mt-2 text-gray-400 dark:text-gray-500">
                Press <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded">Ctrl+K</kbd> or{' '}
                <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded">Cmd+K</kbd> to open this search
              </p>
            </div>
          )}

          {searchQuery && results.length > 0 && (
            <div className="space-y-1">
              {results.map((result, index) => (
                <button
                  key={`${result.type}-${result.link}-${index}`}
                  onClick={() => handleSelectResult(result)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors',
                    'hover:bg-gray-100 dark:hover:bg-gray-700',
                    index === selectedIndex &&
                    'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700'
                  )}
                >
                  <div className="flex-shrink-0 text-gray-500 dark:text-gray-400">
                    {getIcon(result.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-gray-900 dark:text-white">
                      {result.title}
                    </div>
                    {result.path.length > 1 && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 flex items-center gap-1">
                        {result.path.slice(0, -1).map((path, i) => (
                          <React.Fragment key={i}>
                            <span>{path}</span>
                            {i < result.path.length - 2 && (
                              <ChevronRight className="size-3" />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default MenuSearchModal

