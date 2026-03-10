'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, ChevronRight, MapPin, Clock, BookOpen, Award, TrendingUp, DollarSign } from 'lucide-react'
import type { Program } from '@/data/programs'

interface ProgramModalProps {
    program: Program | null
    matchScore: number
    onClose: () => void
}

function FactorBar({ label, value, icon: Icon }: { label: string; value: number; icon: React.ElementType }) {
    const color = value >= 80 ? '#34d399' : value >= 60 ? '#60a5fa' : '#fbbf24'

    return (
        <div>
            <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                    <Icon size={11} style={{ color }} />
                    <span className="text-[11px] font-medium text-slate-400">{label}</span>
                </div>
                <span className="text-[11px] font-bold" style={{ color }}>{value}%</span>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(to right, ${color}80, ${color})` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                />
            </div>
        </div>
    )
}

export default function ProgramModal({ program, matchScore, onClose }: ProgramModalProps) {
    if (!program) return null

    const matchColor = matchScore >= 80 ? '#34d399' : matchScore >= 65 ? '#fbbf24' : '#f87171'
    const circumference = 2 * Math.PI * 32
    const progress = (matchScore / 100) * circumference

    return (
        <AnimatePresence>
            {program && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 z-[60] bg-black/60"
                        style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Sheet */}
                    <motion.div
                        className="fixed bottom-0 left-0 right-0 z-[70] max-w-lg mx-auto"
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                    >
                        <div
                            className="rounded-t-3xl overflow-hidden"
                            style={{
                                background: 'linear-gradient(180deg, #0f172a 0%, #080c14 100%)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderBottom: 'none',
                                maxHeight: '88vh',
                                overflowY: 'auto',
                            }}
                        >
                            {/* Drag indicator */}
                            <div className="flex justify-center pt-3 pb-1">
                                <div className="w-10 h-1 rounded-full bg-white/20" />
                            </div>

                            {/* Hero accent bar */}
                            <div className={`h-1 mx-4 rounded-full bg-gradient-to-r ${program.imageGradient} opacity-80 mb-4`} />

                            <div className="px-5 pb-8">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-5">
                                    <div className="flex-1 min-w-0 pr-3">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-2xl">{program.flag}</span>
                                            <span className="text-xs font-medium text-slate-400">{program.university}</span>
                                        </div>
                                        <h2 className="text-lg font-bold text-white leading-tight">{program.name}</h2>
                                        <div className="flex items-center gap-1.5 mt-1.5">
                                            <MapPin size={12} className="text-slate-500" />
                                            <span className="text-xs text-slate-400">{program.city}, {program.country}</span>
                                        </div>
                                    </div>

                                    {/* Match score ring */}
                                    <div className="relative w-20 h-20 flex items-center justify-center flex-shrink-0">
                                        <svg width="80" height="80" viewBox="0 0 80 80" className="absolute">
                                            <circle cx="40" cy="40" r="32"
                                                fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                                            <motion.circle
                                                cx="40" cy="40" r="32"
                                                fill="none"
                                                stroke={matchColor}
                                                strokeWidth="4"
                                                strokeLinecap="round"
                                                strokeDasharray={circumference}
                                                strokeDashoffset={circumference}
                                                animate={{ strokeDashoffset: circumference - progress }}
                                                transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}
                                                transform="rotate(-90 40 40)"
                                                style={{ filter: `drop-shadow(0 0 6px ${matchColor}80)` }}
                                            />
                                        </svg>
                                        <div className="text-center z-10">
                                            <div className="text-xl font-black" style={{ color: matchColor }}>{matchScore}</div>
                                            <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Match</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Close button */}
                                <motion.button
                                    className="btn-tactile absolute top-5 right-5 w-8 h-8 rounded-xl flex items-center justify-center"
                                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                                    onClick={onClose}
                                    whileTap={{ scale: 0.88 }}
                                    aria-label="Close"
                                >
                                    <X size={14} className="text-slate-400" />
                                </motion.button>

                                {/* Key stats */}
                                <div className="grid grid-cols-3 gap-3 mb-5">
                                    {[
                                        { label: 'Tuition/yr', value: `CA$${(program.tuitionCAD / 1000).toFixed(0)}K`, sub: program.tuitionLocal, icon: DollarSign },
                                        { label: 'Min GPA', value: `${program.minGPA.toFixed(1)}/4.0`, sub: 'Required', icon: TrendingUp },
                                        { label: 'Duration', value: program.duration, sub: 'Full-time', icon: Clock },
                                    ].map(({ label, value, sub, icon: Icon }) => (
                                        <div
                                            key={label}
                                            className="rounded-2xl p-3 text-center"
                                            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                                        >
                                            <Icon size={14} className="text-slate-500 mx-auto mb-1.5" />
                                            <div className="text-xs font-bold text-white">{value}</div>
                                            <div className="text-[9px] text-slate-500 mt-0.5">{sub}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* About */}
                                <div className="mb-5">
                                    <h3 className="text-sm font-bold text-white mb-2">About This Program</h3>
                                    <p className="text-xs text-slate-400 leading-relaxed">{program.description}</p>
                                </div>

                                {/* Highlights */}
                                <div className="mb-5">
                                    <h3 className="text-sm font-bold text-white mb-3">Key Highlights</h3>
                                    <div className="space-y-2">
                                        {program.highlights.map((h, i) => (
                                            <motion.div
                                                key={i}
                                                className="flex items-start gap-2.5"
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 * i }}
                                            >
                                                <div
                                                    className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                                                    style={{ background: 'rgba(52,211,153,0.12)' }}
                                                >
                                                    <span className="text-[10px]">✓</span>
                                                </div>
                                                <span className="text-xs text-slate-300">{h}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Match Factors breakdown */}
                                <div className="mb-5">
                                    <h3 className="text-sm font-bold text-white mb-3">Match Analysis</h3>
                                    <div
                                        className="rounded-2xl p-4 space-y-3"
                                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                                    >
                                        <FactorBar label="Degree Relevance" value={program.matchFactors.degreeRelevance} icon={BookOpen} />
                                        <FactorBar label="GPA Accessibility" value={program.matchFactors.gpaFlexibility} icon={TrendingUp} />
                                        <FactorBar label="Prestige Factor" value={program.matchFactors.institutionPrestige} icon={Award} />
                                        <FactorBar label="Value for Money" value={program.matchFactors.valueForMoney} icon={DollarSign} />
                                        <FactorBar label="Career Outcomes" value={program.matchFactors.careerOutcomes} icon={TrendingUp} />
                                    </div>
                                </div>

                                {/* Application deadline callout */}
                                <div
                                    className="rounded-2xl p-4 mb-5 flex items-center gap-3"
                                    style={{
                                        background: 'rgba(251,191,36,0.06)',
                                        border: '1px solid rgba(251,191,36,0.15)',
                                    }}
                                >
                                    <span className="text-xl">⏰</span>
                                    <div>
                                        <div className="text-xs font-bold text-amber-300">Application Deadline</div>
                                        <div className="text-sm font-semibold text-white mt-0.5">{program.deadline}</div>
                                    </div>
                                </div>

                                {/* CTA */}
                                <motion.a
                                    href={program.applyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-tactile flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-sm font-bold"
                                    style={{
                                        background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                                        boxShadow: '0 6px 30px rgba(59,130,246,0.35)',
                                        color: 'white',
                                    }}
                                    whileTap={{ scale: 0.96 }}
                                >
                                    Apply to {program.university.split(' ')[0]} <ExternalLink size={14} />
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
