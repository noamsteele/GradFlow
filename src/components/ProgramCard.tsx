'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock, TrendingUp, BookOpen, ExternalLink, ChevronRight, Star } from 'lucide-react'
import type { Program } from '@/data/programs'

interface ProgramCardProps {
    program: Program
    matchScore: number
    index: number
    onExpand?: (program: Program) => void
    isSaved?: boolean
    onSave?: (id: string) => void
}

function MatchRing({ score }: { score: number }) {
    const radius = 22
    const circumference = 2 * Math.PI * radius
    const progress = (score / 100) * circumference
    const color = score >= 80 ? '#34d399' : score >= 65 ? '#fbbf24' : '#f87171'
    const shadow = score >= 80 ? 'rgba(52,211,153,0.5)' : score >= 65 ? 'rgba(251,191,36,0.5)' : 'rgba(248,113,113,0.5)'

    return (
        <div className="relative flex items-center justify-center w-14 h-14">
            <svg width="56" height="56" viewBox="0 0 56 56" className="absolute">
                <defs>
                    <linearGradient id={`grad-${score}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={color} stopOpacity="0.4" />
                        <stop offset="100%" stopColor={color} />
                    </linearGradient>
                </defs>
                {/* Track */}
                <circle
                    cx="28" cy="28" r={radius}
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="3"
                />
                {/* Progress */}
                <motion.circle
                    cx="28" cy="28" r={radius}
                    fill="none"
                    stroke={`url(#grad-${score})`}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference}
                    animate={{ strokeDashoffset: circumference - progress }}
                    transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                    transform="rotate(-90 28 28)"
                    style={{ filter: `drop-shadow(0 0 4px ${shadow})` }}
                />
            </svg>
            <div className="text-center z-10">
                <motion.div
                    className="text-sm font-bold leading-none"
                    style={{ color }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    {score}
                </motion.div>
                <div className="text-[8px] font-semibold text-slate-500 leading-none mt-0.5">MATCH</div>
            </div>
        </div>
    )
}

function RegionBadge({ region }: { region: string }) {
    const styles: Record<string, { bg: string; text: string }> = {
        'Europe': { bg: 'rgba(99, 102, 241, 0.15)', text: '#a5b4fc' },
        'UK': { bg: 'rgba(244, 63, 94, 0.15)', text: '#fda4af' },
        'Australia': { bg: 'rgba(16, 185, 129, 0.15)', text: '#6ee7b7' },
    }
    const style = styles[region] || styles['Europe']

    return (
        <span
            className="chip text-[10px]"
            style={{ background: style.bg, color: style.text, border: `1px solid ${style.text}30` }}
        >
            {region}
        </span>
    )
}

export default function ProgramCard({
    program,
    matchScore,
    index,
    onExpand,
    isSaved = false,
    onSave,
}: ProgramCardProps) {
    const cardVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: 'spring' as const,
                stiffness: 280,
                damping: 24,
                delay: index * 0.07,
            },
        },
    }

    const matchColor = matchScore >= 80 ? '#34d399' : matchScore >= 65 ? '#fbbf24' : '#f87171'

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            layout
            className="glass-card card-hover relative overflow-hidden cursor-pointer"
            onClick={() => onExpand?.(program)}
            whileTap={{ scale: 0.975 }}
        >
            {/* Top gradient accent bar */}
            <div
                className={`h-1 w-full bg-gradient-to-r ${program.imageGradient} opacity-70`}
            />

            {/* Subtle background glow */}
            <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                    background: `radial-gradient(ellipse at top right, ${program.region === 'UK' ? '#f43f5e' :
                        program.region === 'Australia' ? '#10b981' : '#6366f1'
                        }, transparent 70%)`,
                }}
            />

            <div className="p-4 relative">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                        {/* Flag + University */}
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-xl">{program.flag}</span>
                            <span className="text-xs text-slate-400 font-medium truncate">
                                {program.university}
                            </span>
                        </div>

                        {/* Program name */}
                        <h3 className="text-sm font-bold text-white leading-tight mb-2 pr-2">
                            {program.name}
                        </h3>

                        {/* Badges row */}
                        <div className="flex items-center flex-wrap gap-1.5">
                            <RegionBadge region={program.region} />
                            <span
                                className="chip"
                                style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.08)' }}
                            >
                                <Clock size={9} /> {program.duration}
                            </span>
                            {program.ranking && program.ranking <= 50 && (
                                <span
                                    className="chip"
                                    style={{ background: 'rgba(251, 191, 36, 0.1)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.2)' }}
                                >
                                    <Star size={9} fill="currentColor" /> Top {program.ranking}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Match ring */}
                    <MatchRing score={matchScore} />
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                    {/* Tuition */}
                    <div
                        className="rounded-xl p-2.5 text-center"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                        <div className="text-[10px] text-slate-500 font-medium mb-0.5 uppercase tracking-wide">Tuition</div>
                        <div className="text-xs font-bold text-white">
                            {program.tuitionCAD >= 1000
                                ? `CA$${(program.tuitionCAD / 1000).toFixed(0)}K`
                                : `CA$${program.tuitionCAD}`}
                        </div>
                        <div className="text-[9px] text-slate-500">/yr</div>
                    </div>

                    {/* Min GPA */}
                    <div
                        className="rounded-xl p-2.5 text-center"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                        <div className="text-[10px] text-slate-500 font-medium mb-0.5 uppercase tracking-wide">Min GPA</div>
                        <div className="text-xs font-bold" style={{ color: matchColor }}>
                            {program.minGPA.toFixed(1)}
                        </div>
                        <div className="text-[9px] text-slate-500">/4.0</div>
                    </div>

                    {/* Deadline */}
                    <div
                        className="rounded-xl p-2.5 text-center"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                        <div className="text-[10px] text-slate-500 font-medium mb-0.5 uppercase tracking-wide">Deadline</div>
                        <div className="text-[10px] font-bold text-white leading-tight">
                            {program.deadline.split(',')[0]}
                        </div>
                        <div className="text-[9px] text-slate-500">{program.deadline.split(' ').pop()}</div>
                    </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed mb-3 line-clamp-2">
                    {program.description}
                </p>

                {/* Highlights pills */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                    {program.highlights.slice(0, 2).map((h, i) => (
                        <span
                            key={i}
                            className="text-[10px] font-medium px-2 py-1 rounded-lg"
                            style={{ background: 'rgba(59,130,246,0.08)', color: '#93c5fd', border: '1px solid rgba(59,130,246,0.15)' }}
                        >
                            ✦ {h}
                        </span>
                    ))}
                </div>

                {/* Footer row */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <MapPin size={11} className="text-slate-500" />
                        <span className="text-xs text-slate-500">{program.city}, {program.country.split('/')[0].trim()}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Save button */}
                        <motion.button
                            className="btn-tactile w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{
                                background: isSaved ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.05)',
                                border: `1px solid ${isSaved ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.08)'}`,
                            }}
                            onClick={(e) => {
                                e.stopPropagation()
                                onSave?.(program.id)
                            }}
                            whileTap={{ scale: 0.85 }}
                            aria-label={isSaved ? 'Unsave program' : 'Save program'}
                        >
                            <BookOpen
                                size={13}
                                style={{ color: isSaved ? '#a5b4fc' : '#64748b' }}
                                fill={isSaved ? 'currentColor' : 'none'}
                            />
                        </motion.button>

                        {/* Explore button */}
                        <motion.div
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold"
                            style={{
                                background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(99,102,241,0.2))',
                                border: '1px solid rgba(99,102,241,0.25)',
                                color: '#a5b4fc',
                            }}
                            whileTap={{ scale: 0.92 }}
                        >
                            Explore <ChevronRight size={12} />
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
