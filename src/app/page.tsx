'use client'

import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import DiscoverView from '@/components/DiscoverView'
import HomeView from '@/components/HomeView'
import SavedView from '@/components/SavedView'
import ProfileView from '@/components/ProfileView'

export default function GradFlowApp() {
    const [activeTab, setActiveTab] = useState('home')
    const [searchOpen, setSearchOpen] = useState(false)
    const [savedIds, setSavedIds] = useState<Set<string>>(new Set())

    const handleTabChange = useCallback((tab: string) => {
        setActiveTab(tab)
        setSearchOpen(false)
    }, [])

    const handleSearchOpen = useCallback(() => {
        setActiveTab('discover')
        setSearchOpen(true)
    }, [])

    const handleRemoveSaved = useCallback((id: string) => {
        setSavedIds((prev) => {
            const next = new Set(prev)
            next.delete(id)
            return next
        })
    }, [])

    const pageVariants = {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -12 },
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'home':
                return (
                    <motion.div key="home" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                        <HomeView onDiscover={() => setActiveTab('discover')} />
                    </motion.div>
                )
            case 'discover':
                return (
                    <motion.div key="discover" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                        <DiscoverView
                            searchOpen={searchOpen}
                            onSearchClose={() => setSearchOpen(false)}
                        />
                    </motion.div>
                )
            case 'saved':
                return (
                    <motion.div key="saved" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                        <SavedView savedIds={savedIds} onRemove={handleRemoveSaved} />
                    </motion.div>
                )
            case 'profile':
                return (
                    <motion.div key="profile" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                        <ProfileView />
                    </motion.div>
                )
            default:
                return null
        }
    }

    return (
        <div
            style={{
                minHeight: '100svh',
                background: 'linear-gradient(160deg, #080c14 0%, #0d1421 50%, #080c14 100%)',
            }}
        >
            <Header onSearchOpen={handleSearchOpen} notificationCount={3} />

            {/* Main scroll area */}
            <main
                className="scroll-ios max-w-lg mx-auto px-4"
                style={{
                    paddingTop: 'calc(72px + env(safe-area-inset-top, 0px))',
                    paddingBottom: 'calc(80px + env(safe-area-inset-bottom, 0px))',
                    minHeight: '100svh',
                }}
            >
                <AnimatePresence mode="wait">
                    {renderContent()}
                </AnimatePresence>
            </main>

            <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
    )
}
