'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, ChevronDown, Sparkles, Star } from 'lucide-react'
import { useState } from 'react'
import { undergraduateSchools } from '@/data/programs'

interface EligibilityFilterProps {
    selectedSchool: string
    selectedDegree: string
    userGPA: number
    onSchoolChange: (school: string) => void
    onDegreeChange: (degree: string) => void
    onGPAChange: (gpa: number) => void
}

const GPA_MARKS = [2.0, 2.5, 3.0, 3.3, 3.5, 3.7, 4.0]

function GPASlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
    const min = 2.0
    const max = 4.0
    const pct = ((value - min) / (max - min)) * 100
    const color = value >= 3.5 ? '#34d399' : value >= 3.0 ? '#60a5fa' : value >= 2.5 ? '#fbbf24' : '#f87171'

    return (
        <div className="mt-3">
            <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    Current GPA
                </label>
                <motion.div
                    key={value}
                    className="px-2.5 py-1 rounded-lg text-sm font-bold"
                    style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                    {value.toFixed(1)} / 4.0
                </motion.div>
            </div>

            <div className="relative">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={0.1}
                    value={value}
                    onChange={(e) => onChange(parseFloat(e.target.value))}
                    className="w-full h-2 rounded-full outline-none cursor-pointer appearance-none"
                    style={{
                        background: `linear-gradient(to right, ${color} 0%, ${color} ${pct}%, rgba(255,255,255,0.08) ${pct}%, rgba(255,255,255,0.08) 100%)`,
                    }}
                    aria-label="GPA slider"
                />

                {/* GPA marks */}
                <div className="flex justify-between mt-2">
                    {GPA_MARKS.map((mark) => (
                        <button
                            key={mark}
                            onClick={() => onChange(mark)}
                            className="text-[9px] font-medium transition-colors duration-200 btn-tactile"
                            style={{ color: Math.abs(value - mark) < 0.05 ? color : '#475569' }}
                        >
                            {mark.toFixed(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* GPA interpretation */}
            <motion.div
                key={`gpa-interp-${Math.round(value * 10)}`}
                className="mt-2 text-[10px] font-medium"
                style={{ color: color }}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
            >
                {value >= 3.7 ? '⭐ Excellent — qualifies for virtually all programs'
                    : value >= 3.5 ? '✅ Strong — opens doors to elite programs'
                        : value >= 3.0 ? '✔ Good — eligible for most programs on the list'
                            : value >= 2.5 ? '⚠️ Fair — eligible for accessible programs'
                                : '⚠️ Below minimum for most programs — consider boosting with work exp.'}
            </motion.div>
        </div>
    )
}

export default function EligibilityFilter({
    selectedSchool,
    selectedDegree,
    userGPA,
    onSchoolChange,
    onDegreeChange,
    onGPAChange,
}: EligibilityFilterProps) {
    const [expanded, setExpanded] = useState(true)
    const school = undergraduateSchools.find((s) => s.id === selectedSchool) || undergraduateSchools[0]

    return (
        <motion.div
            className="glass-card relative overflow-hidden"
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            {/* Purple glow accent */}
            <div
                className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, #8b5cf6, transparent 70%)',
                    filter: 'blur(20px)',
                }}
            />

            {/* Header */}
            <motion.button
                className="btn-tactile w-full p-4 flex items-center justify-between"
                onClick={() => setExpanded(!expanded)}
                whileTap={{ scale: 0.98 }}
                aria-label="Toggle eligibility filter"
            >
                <div className="flex items-center gap-3">
                    <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)' }}
                    >
                        <Sparkles size={16} className="text-white" />
                    </div>
                    <div className="text-left">
                        <div className="text-sm font-bold text-white">Your Profile</div>
                        <div className="text-xs text-slate-400 mt-0.5">
                            {school.name.split('(')[0].trim()} · {selectedDegree.split(' ').slice(-2).join(' ')} · {userGPA.toFixed(1)} GPA
                        </div>
                    </div>
                </div>
                <motion.div
                    animate={{ rotate: expanded ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                    <ChevronDown size={16} className="text-slate-400" />
                </motion.div>
            </motion.button>

            {/* Expandable content */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 pb-4 space-y-4">
                            {/* Divider */}
                            <div className="h-px bg-white/[0.05]" />

                            {/* School selector */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                                    Undergraduate School
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedSchool}
                                        onChange={(e) => {
                                            onSchoolChange(e.target.value)
                                            const newSchool = undergraduateSchools.find(s => s.id === e.target.value)
                                            if (newSchool) onDegreeChange(newSchool.degrees[0])
                                        }}
                                        className="input-field pr-8 text-sm"
                                        aria-label="Select undergraduate school"
                                    >
                                        {undergraduateSchools.map((s) => (
                                            <option key={s.id} value={s.id}>
                                                {s.name}
                                            </option>
                                        ))}
                                    </select>
                                    <GraduationCap size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                                </div>
                                <div className="flex items-center gap-1.5 mt-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                    <span className="text-[10px] text-emerald-400 font-medium">
                                        Recognized by all listed programs
                                    </span>
                                </div>
                            </div>

                            {/* Degree selector */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                                    Your Degree
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {school.degrees.map((degree) => (
                                        <motion.button
                                            key={degree}
                                            className="btn-tactile text-xs font-medium px-3 py-2 rounded-xl border transition-colors"
                                            style={{
                                                background: selectedDegree === degree
                                                    ? 'linear-gradient(135deg, rgba(99,102,241,0.25), rgba(139,92,246,0.25))'
                                                    : 'rgba(255,255,255,0.04)',
                                                borderColor: selectedDegree === degree
                                                    ? 'rgba(139,92,246,0.4)'
                                                    : 'rgba(255,255,255,0.07)',
                                                color: selectedDegree === degree ? '#c4b5fd' : '#64748b',
                                            }}
                                            onClick={() => onDegreeChange(degree)}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {selectedDegree === degree && (
                                                <motion.span layoutId="degree-check" className="mr-1">✓</motion.span>
                                            )}
                                            {degree}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* GPA Slider */}
                            <GPASlider value={userGPA} onChange={onGPAChange} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
