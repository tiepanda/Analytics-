"use client"

import Link from "next/link";
import { Button } from "../../components/ui/button";
import {
  ArrowRight,
  BarChart3,
  Cpu,
  Database,
  Gauge,
  LineChart,
  Zap,
  Shield,
  TrendingUp,
} from "lucide-react";
import { LampContainer } from "./LampContainer";
import { motion } from "framer-motion";
import Navigation from "./LandingNavbar";
import SplashCursor from "../../components/splash-cursor";
import ModernTechBackground from "../../components/modern-tech-background";
import CustomPointer from "../../components/custom-pointer";
import "./styles.css"; // Import scoped styles

export default function LandingPage() {

  return (
    <div className="flex min-h-screen flex-col w-full relative overflow-hidden bg-white dark:bg-slate-950">
      {/* Modern Tech Background */}
      <ModernTechBackground className="opacity-60 z-0" />

      {/* Splash Cursor Effect */}
      <SplashCursor />

      {/* Custom Glowing Pointer */}
      <CustomPointer
        style="auto"
        size="medium"
        color="auto"
        intensity="medium"
        className="z-50"
      />

      {/* Modern Glassmorphic Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 3.0,
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        <Navigation />
      </motion.div>

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        {/* Hero Section with Lamp Effect */}
        <section className="w-full relative z-10">
          <LampContainer className="bg-transparent">
            <div className="h-96"></div>

            <div className="flex flex-col items-center justify-center space-y-8 text-center mt-16">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.8,
                  duration: 0.8,
                  ease: "easeOut",
                }}
                className="space-y-4 text-center"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 2.0,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300"
                >
                  <Zap className="mr-1 h-3 w-3" />
                  Industry 4.0 Ready
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 2.3,
                    duration: 1.0,
                    ease: "easeOut",
                  }}
                  className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-gradient-to-br from-slate-900 to-slate-600 dark:from-slate-300 dark:to-slate-500 py-4 bg-clip-text text-transparent"
                >
                  Real-time Machine Analytics
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 2.7,
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                  className="max-w-[600px] mx-auto text-lg text-slate-700 dark:text-slate-300 md:text-xl leading-relaxed"
                >
                  Monitor machine performance, analyze production metrics, and receive
                  <span className="font-semibold text-cyan-600 dark:text-cyan-400"> predictive maintenance alerts </span>
                  in real-time with our advanced Industry 4.0 platform.
                </motion.p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 3.2,
                  duration: 0.8,
                  ease: "easeOut",
                }}
                className="flex flex-col gap-3 min-[400px]:flex-row justify-center"
              >
                <Link href="/auth/login">
                  <Button size="lg" className="gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 landing-btn-modern landing-pulse-glow rounded-full">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline" className="backdrop-blur-sm border-cyan-600 dark:border-cyan-500/20 hover:bg-cyan-600/10 dark:hover:bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 rounded-full">
                    Learn More
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 3.7,
                  duration: 0.8,
                  ease: "easeOut",
                }}
                className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400 justify-center"
              >
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span>Enterprise Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                  <span>99.9% Uptime</span>
                </div>
              </motion.div>
            </div>
          </LampContainer>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 relative"
        >
          <div className="container relative z-20">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent dark:from-white dark:to-blue-200">
                  Comprehensive Analytics Suite
                </h2>
                <p className="max-w-[900px] text-slate-600 dark:text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our integrated platform connects all your Industry 4.0 systems
                  for seamless data collection, processing, and visualization.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 landing-modern-card landing-industry-card">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 p-4 mb-6 w-fit shadow-lg landing-glow-blue">
                    <Gauge className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 landing-gradient-text-blue">Real-time Monitoring</h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    Track machine status, cycle counts, and operator details with
                    <span className="font-semibold text-blue-600 dark:text-blue-400"> real-time precision</span>.
                  </p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 landing-modern-card landing-industry-card">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="rounded-full bg-gradient-to-r from-green-500 to-emerald-500 p-4 mb-6 w-fit shadow-lg landing-glow-green">
                    <LineChart className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 landing-gradient-text-green">Performance Analytics</h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    Visualize utilization, efficiency, and downtime with
                    <span className="font-semibold text-green-600 dark:text-green-400"> advanced AI-powered charts</span>.
                  </p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 landing-modern-card landing-industry-card">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-4 mb-6 w-fit shadow-lg landing-glow-purple">
                    <Cpu className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 landing-gradient-text-purple">Predictive Maintenance</h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    Receive AI-powered alerts for potential failures
                    <span className="font-semibold text-purple-600 dark:text-purple-400"> before they occur</span>.
                  </p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 landing-modern-card landing-industry-card">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 p-4 mb-6 w-fit shadow-lg landing-glow-orange">
                    <Database className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Centralized Database</h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    All systems connected via a unified database for
                    <span className="font-semibold text-orange-600 dark:text-orange-400"> seamless integration</span>.
                  </p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 landing-modern-card landing-industry-card">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 p-4 mb-6 w-fit shadow-lg landing-glow-blue">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 landing-gradient-text-blue">OEE Analysis</h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    Track Overall Equipment Effectiveness at
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400"> all levels</span>.
                  </p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 landing-modern-card landing-industry-card">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 p-4 mb-6 w-fit shadow-lg landing-glow-teal">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Secure Access</h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    Role-based access control for
                    <span className="font-semibold text-teal-600 dark:text-teal-400"> all team members</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-24 relative">
          <div className="container relative z-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">99.9%</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">24/7</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Monitoring</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">50+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Integrations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">1000+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Machines</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm items-center justify-center relative z-10">
        <p className="text-xs text-slate-600 dark:text-slate-400">
          © 2025 Loginware Softtec PVT LTD. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
