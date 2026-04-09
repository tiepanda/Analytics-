"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { ThemeToggle } from "../../components/theme-toggle"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet"
import Image from "next/image"

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "Analytics", href: "#analytics" },
    { name: "Pricing", href: "#pricing" }
  ]

  return (
    <nav
      className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 rounded-full ${isScrolled
          ? "h-14 bg-white/80 dark:bg-slate-950/40 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 scale-95 w-[90%] max-w-2xl"
          : "h-14 bg-white/60 dark:bg-slate-950/20 backdrop-blur-lg w-[95%] max-w-3xl"
        }`}
    >
      <div className={`flex items-center justify-between h-full ${isScrolled ? "px-4" : "px-6"}`}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="rounded-lg">
            <Image
              src="/Eagle-Logo.png"
              alt="Eagle Logo"
              width="75"
              height="75"
              className="h-full w-10"
            />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Eagle Analytics
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-medium"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link href="/auth/login">
            <Button variant="outline" size="sm" className="border-slate-300 dark:border-white/20 text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-full">
              Login
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button size="sm" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-full">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-l border-slate-200 dark:border-white/10"
            >
              <div className="flex flex-col gap-6 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors text-lg font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex flex-col gap-3 pt-6 border-t border-slate-200 dark:border-white/10">
                  <Link href="/auth/login">
                    <Button variant="outline" className="w-full border-slate-300 dark:border-white/20 text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-full">
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth/login">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-full">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
