'use client'

import { motion } from 'framer-motion'
import { Home, Compass, BookOpen, User } from 'lucide-react'

interface TabBarProps {
    activeTab: string
    onTabChange: (tab: string) => void
}

const tabs = [
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'home', label: 'Home', icon: Home },
    { id: 'saved', label: 'Saved', icon: BookOpen },
    { id: 'profile', label: 'Profile', icon: User },
]

export default function TabBar({ activeTab, onTabChange }: TabBarProps) {
    return (
        <nav className="tab-bar fixed bottom-0 left-0 right-0 z-50 border-t border-white/[0.06]">
            <div className="max-w-lg mx-auto px-2 pt-2 pb-1 flex items-center justify-around">
                {tabs.map((tab) => {
                    const Icon = tab.icon
                    const isActive = activeTab === tab.id

                    return (
                        <motion.button
                            key={tab.id}
                            className="btn-tactile flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl relative min-w-[64px]"
                            onClick={() => onTabChange(tab.id)}
                            whileTap={{ scale: 0.88 }}
                            aria-label={`${tab.label} tab`}
                        >
                            {/* Active indicator */}
                            {isActive && (
                                <motion.div
                                    className="absolute inset-0 rounded-xl"
                                    style={{
                                        background: 'rgba(59, 130, 246, 0.12)',
                                    }}
                                    layoutId="tab-bg"
                                    transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
                                />
                            )}

                            <motion.div
                                animate={{
                                    scale: isActive ? 1.1 : 1,
                                    y: isActive ? -1 : 0,
                                }}
                                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                            >
                                <Icon
                                    size={22}
                                    strokeWidth={isActive ? 2.5 : 1.8}
                                    style={{
                                        color: isActive ? '#60a5fa' : '#64748b',
                                        filter: isActive ? 'drop-shadow(0 0 6px rgba(96, 165, 250, 0.6))' : 'none',
                                    }}
                                />
                            </motion.div>

                            <motion.span
                                className="text-[10px] font-semibold leading-none"
                                animate={{
                                    color: isActive ? '#60a5fa' : '#64748b',
                                }}
                            >
                                {tab.label}
                            </motion.span>

                            {/* Active dot */}
                            {isActive && (
                                <motion.div
                                    className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400"
                                    layoutId="tab-dot"
                                    transition={{ type: 'spring', bounce: 0.4, duration: 0.5 }}
                                />
                            )}
                        </motion.button>
                    )
                })}
            </div>
        </nav>
    )
}
