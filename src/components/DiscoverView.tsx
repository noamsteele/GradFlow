'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo, useCallback } from 'react'
import ProgramCard from '@/components/ProgramCard'
import EligibilityFilter from '@/components/EligibilityFilter'
import ProgramModal from '@/components/ProgramModal'
import { programs, calculateMatchScore, undergraduateSchools } from '@/data/programs'
import type { Program } from '@/data/programs'
import { Search, SlidersHorizontal, X } from 'lucide-react'

const REGIONS = ['All', 'Europe', 'UK', 'Australia'] as const
type Region = typeof REGIONS[number]

const SORT_OPTIONS = [
    { id: 'match', label: 'Best Match' },
    { id: 'tuition-asc', label: 'Lowest Tuition' },
    { id: 'gpa-asc', label: 'Easiest GPA' },
    { id: 'deadline', label: 'Earliest Deadline' },
] as const

interface DiscoverViewProps {
    searchOpen: boolean
    onSearchClose: () => void
}

export default function DiscoverView({ searchOpen, onSearchClose }: DiscoverViewProps) {
    const [selectedSchool, setSelectedSchool] = useState('ubco')
    const [selectedDegree, setSelectedDegree] = useState('Bachelor of Management')
    const [userGPA, setUserGPA] = useState(3.3)
    const [region, setRegion] = useState<Region>('All')
    const [sortBy, setSortBy] = useState<string>('match')
    const [searchQuery, setSearchQuery] = useState('')
    const [savedIds, setSavedIds] = useState<Set<string>>(new Set())
    const [expandedProgram, setExpandedProgram] = useState<Program | null>(null)
    const [expandedScore, setExpandedScore] = useState(0)

    const toggleSave = useCallback((id: string) => {
        setSavedIds((prev) => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
    }, [])

    const handleExpand = useCallback((program: Program, score: number) => {
        setExpandedProgram(program)
        setExpandedScore(score)
    }, [])

    const programsWithScores = useMemo(() => {
        return programs.map((p) => ({
            program: p,
            score: calculateMatchScore(p, userGPA, selectedDegree),
        }))
    }, [userGPA, selectedDegree])

    const filtered = useMemo(() => {
        let list = programsWithScores

        if (region !== 'All') {
            list = list.filter((p) => p.program.region === region)
        }

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase()
            list = list.filter(
                (p) =>
                    p.program.name.toLowerCase().includes(q) ||
                    p.program.university.toLowerCase().includes(q) ||
                    p.program.country.toLowerCase().includes(q) ||
                    p.program.city.toLowerCase().includes(q)
            )
        }

        return list.sort((a, b) => {
            switch (sortBy) {
                case 'match': return b.score - a.score
                case 'tuition-asc': return a.program.tuitionCAD - b.program.tuitionCAD
                case 'gpa-asc': return a.program.minGPA - b.program.minGPA
                case 'deadline': return a.program.deadlineISO.localeCompare(b.program.deadlineISO)
                default: return 0
            }
        })
    }, [programsWithScores, region, searchQuery, sortBy])

    const topMatch = filtered[0]

    return (
        <div className="flex flex-col min-h-full">
            {/* Search overlay */}
            <AnimatePresence>
                {searchOpen && (
                    <motion.div
                        className="fixed inset-0 z-[55] flex items-start pt-20 px-4"
                        style={{ background: 'rgba(8,12,20,0.95)', backdropFilter: 'blur(20px)' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="w-full max-w-lg mx-auto">
                            <div className="relative">
                                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    autoFocus
                                    type="search"
                                    placeholder="Search programs, universities, cities..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="input-field pl-10 pr-10 text-sm"
                                    aria-label="Search programs"
                                />
                                <button
                                    onClick={onSearchClose}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 btn-tactile"
                                    aria-label="Close search"
                                >
                                    <X size={16} className="text-slate-400" />
                                </button>
                            </div>
                            {searchQuery && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-2 text-xs text-slate-500 px-1"
                                >
                                    {filtered.length} results for &quot;{searchQuery}&quot;
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Top match hero (only show when not filtering) */}
            {!searchQuery && region === 'All' && topMatch && sortBy === 'match' && (
                <motion.div
                    className="glass-card relative overflow-hidden mb-4 cursor-pointer"
                    onClick={() => handleExpand(topMatch.program, topMatch.score)}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                    {/* Gradient bg */}
                    <div
                        className={`absolute inset-0 bg-gradient-to-br ${topMatch.program.imageGradient} opacity-20 pointer-events-none`}
                    />
                    <div className="orb orb-blue absolute -top-10 -right-5 w-32 h-32" />

                    <div className="relative p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span
                                className="chip text-[10px] font-bold"
                                style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.25)' }}
                            >
                                ⭐ TOP MATCH FOR YOU
                            </span>
                        </div>

                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-2xl">{topMatch.program.flag}</span>
                                    <span className="text-xs text-slate-400">{topMatch.program.university}</span>
                                </div>
                                <h3 className="text-sm font-bold text-white leading-tight">{topMatch.program.name}</h3>
                                <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                                    {topMatch.program.description}
                                </p>
                            </div>
                            <div className="flex-shrink-0 text-center">
                                <div
                                    className="text-3xl font-black mb-0.5"
                                    style={{
                                        color: topMatch.score >= 80 ? '#34d399' : '#fbbf24',
                                        filter: `drop-shadow(0 0 10px ${topMatch.score >= 80 ? '#34d39980' : '#fbbf2480'})`,
                                    }}
                                >
                                    {topMatch.score}%
                                </div>
                                <div className="text-[9px] text-slate-500 font-semibold uppercase">Match</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mt-3">
                            <span className="text-xs text-slate-400">CA${(topMatch.program.tuitionCAD / 1000).toFixed(0)}K/yr</span>
                            <span className="text-slate-600">·</span>
                            <span className="text-xs text-slate-400">{topMatch.program.duration}</span>
                            <span className="text-slate-600">·</span>
                            <span className="text-xs text-slate-400">{topMatch.program.city}</span>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Eligibility filter */}
            <div className="mb-4">
                <EligibilityFilter
                    selectedSchool={selectedSchool}
                    selectedDegree={selectedDegree}
                    userGPA={userGPA}
                    onSchoolChange={setSelectedSchool}
                    onDegreeChange={setSelectedDegree}
                    onGPAChange={setUserGPA}
                />
            </div>

            {/* Region filter pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
                {REGIONS.map((r) => (
                    <motion.button
                        key={r}
                        className={`filter-pill flex-shrink-0 ${region === r ? 'active' : ''}`}
                        onClick={() => setRegion(r)}
                        whileTap={{ scale: 0.93 }}
                    >
                        {r === 'All' ? '🌍 All' : r === 'Europe' ? '🇪🇺 Europe' : r === 'UK' ? '🇬🇧 UK' : '🇦🇺 Australia'}
                    </motion.button>
                ))}
            </div>

            {/* Sort + Result count row */}
            <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-slate-500 font-medium">
                    <span className="text-white font-bold">{filtered.length}</span> programs found
                </span>

                <div className="relative">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="text-xs font-medium pl-7 pr-3 py-1.5 rounded-xl outline-none appearance-none cursor-pointer"
                        style={{
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            color: '#94a3b8',
                        }}
                        aria-label="Sort programs"
                    >
                        {SORT_OPTIONS.map((opt) => (
                            <option key={opt.id} value={opt.id} style={{ background: '#1e293b' }}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    <SlidersHorizontal size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>
            </div>

            {/* Program cards feed */}
            <motion.div layout className="space-y-3">
                <AnimatePresence mode="popLayout">
                    {filtered.map(({ program, score }, i) => (
                        <ProgramCard
                            key={program.id}
                            program={program}
                            matchScore={score}
                            index={i}
                            onExpand={(p) => handleExpand(p, score)}
                            isSaved={savedIds.has(program.id)}
                            onSave={toggleSave}
                        />
                    ))}
                </AnimatePresence>

                {filtered.length === 0 && (
                    <motion.div
                        className="text-center py-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="text-4xl mb-3">🔍</div>
                        <div className="text-sm font-semibold text-slate-400">No programs match your search</div>
                        <div className="text-xs text-slate-600 mt-1">Try adjusting your filters</div>
                    </motion.div>
                )}
            </motion.div>

            {/* Program detail modal */}
            <ProgramModal
                program={expandedProgram}
                matchScore={expandedScore}
                onClose={() => setExpandedProgram(null)}
            />
        </div>
    )
}
