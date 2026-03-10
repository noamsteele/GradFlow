'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Compass, Bell, Search } from 'lucide-react'
import { useState, useEffect } from 'react'

interface HeaderProps {
    onSearchOpen?: () => void
    notificationCount?: number
}

export default function Header({ onSearchOpen, notificationCount = 0 }: HeaderProps) {
    const [scrolled, setScrolled] = useState(false)
    const [showNotifDot, setShowNotifDot] = useState(notificationCount > 0)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <motion.header
            className={`glass-header fixed top-0 left-0 right-0 z-50 header-safe transition-all duration-300 ${scrolled ? 'shadow-lg shadow-black/20' : ''
                }`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <div className="max-w-lg mx-auto px-4 pb-3 flex items-center justify-between">
                {/* Logo */}
                <motion.div
                    className="flex items-center gap-2"
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="relative">
                        <motion.div
                            className="w-8 h-8 rounded-xl flex items-center justify-center"
                            style={{
                                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                                boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
                            }}
                            animate={{
                                boxShadow: [
                                    '0 4px 15px rgba(59, 130, 246, 0.4)',
                                    '0 4px 25px rgba(139, 92, 246, 0.5)',
                                    '0 4px 15px rgba(59, 130, 246, 0.4)',
                                ],
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <Compass size={16} className="text-white" strokeWidth={2.5} />
                        </motion.div>
                    </div>
                    <div>
                        <span className="text-base font-bold gradient-text">GradFlow</span>
                        <div className="text-xs text-slate-500 -mt-0.5 leading-none font-medium">
                            Global Degree Discovery
                        </div>
                    </div>
                </motion.div>

                {/* Right actions */}
                <div className="flex items-center gap-2">
                    <motion.button
                        className="btn-tactile w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                        onClick={onSearchOpen}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Search programs"
                    >
                        <Search size={16} className="text-slate-300" />
                    </motion.button>

                    <motion.button
                        className="btn-tactile w-9 h-9 rounded-xl flex items-center justify-center relative"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Notifications"
                        onClick={() => setShowNotifDot(false)}
                    >
                        <Bell size={16} className="text-slate-300" />
                        <AnimatePresence>
                            {showNotifDot && (
                                <motion.span
                                    className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                                    style={{ background: 'linear-gradient(135deg, #f43f5e, #ec4899)' }}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                />
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>
            </div>
        </motion.header>
    )
}
