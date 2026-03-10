'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Globe, Users, Zap, TrendingUp } from 'lucide-react'
import { programs } from '@/data/programs'

interface HomeViewProps {
    onDiscover: () => void
}

const stats = [
    { label: 'Programs Listed', value: '10', icon: Globe, color: '#60a5fa' },
    { label: 'Countries', value: '8+', icon: Globe, color: '#34d399' },
    { label: 'Avg Match Score', value: '82%', icon: TrendingUp, color: '#a78bfa' },
    { label: 'Alumni Network', value: '75K+', icon: Users, color: '#fbbf24' },
]

export default function HomeView({ onDiscover }: HomeViewProps) {
    const europeanCount = programs.filter(p => p.region === 'Europe').length
    const ukCount = programs.filter(p => p.region === 'UK').length
    const auCount = programs.filter(p => p.region === 'Australia').length

    return (
        <div className="relative">
            {/* Background orbs */}
            <div className="orb orb-blue absolute top-0 left-1/4 w-48 h-48 -translate-x-1/2" />
            <div className="orb orb-purple absolute top-24 right-0 w-40 h-40" />
            <div className="orb orb-cyan absolute bottom-20 left-0 w-36 h-36" />

            {/* Hero */}
            <div className="relative text-center pt-6 pb-8">
                {/* Animated globe */}
                <motion.div
                    className="w-20 h-20 rounded-2xl mx-auto mb-5 flex items-center justify-center"
                    style={{
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)',
                        boxShadow: '0 0 40px rgba(59, 130, 246, 0.4), 0 0 80px rgba(139, 92, 246, 0.2)',
                    }}
                    animate={{
                        boxShadow: [
                            '0 0 40px rgba(59, 130, 246, 0.4), 0 0 80px rgba(139, 92, 246, 0.2)',
                            '0 0 60px rgba(139, 92, 246, 0.5), 0 0 100px rgba(6, 182, 212, 0.25)',
                            '0 0 40px rgba(59, 130, 246, 0.4), 0 0 80px rgba(139, 92, 246, 0.2)',
                        ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    initial={{ scale: 0, rotate: -10 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                >
                    <Globe size={36} className="text-white" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="chip mb-3 mx-auto inline-flex" style={{ background: 'rgba(99,102,241,0.12)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.2)' }}>
                        <Zap size={10} fill="currentColor" /> For UBCO Graduates
                    </div>

                    <h1 className="text-3xl font-black text-white leading-tight mb-3">
                        Find Your
                        <span className="block gradient-text">Global Master&apos;s</span>
                    </h1>
                    <p className="text-sm text-slate-400 leading-relaxed max-w-xs mx-auto mb-6">
                        Discover perfectly matched post-graduate programs in Europe, the UK, and Australia — tailored to your UBCO degree and GPA.
                    </p>
                </motion.div>

                <motion.button
                    className="btn-tactile flex items-center gap-2 mx-auto px-6 py-3.5 rounded-2xl text-sm font-bold"
                    style={{
                        background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                        boxShadow: '0 8px 30px rgba(59,130,246,0.4)',
                        color: 'white',
                    }}
                    onClick={onDiscover}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    Explore Programs <ArrowRight size={16} />
                </motion.button>
            </div>

            {/* Stats grid */}
            <motion.div
                className="grid grid-cols-2 gap-3 mb-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        className="glass-card p-4 text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.08 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <div
                            className="text-2xl font-black mb-1"
                            style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}50` }}
                        >
                            {stat.value}
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium">{stat.label}</div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Region breakdown */}
            <motion.div
                className="glass-card p-4 mb-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
            >
                <h2 className="text-sm font-bold text-white mb-3">Programs by Region</h2>
                <div className="space-y-3">
                    {[
                        { region: 'Europe', count: europeanCount, color: '#6366f1', flag: '🇪🇺' },
                        { region: 'United Kingdom', count: ukCount, color: '#f43f5e', flag: '🇬🇧' },
                        { region: 'Australia', count: auCount, color: '#10b981', flag: '🇦🇺' },
                    ].map((item, i) => (
                        <div key={item.region}>
                            <div className="flex items-center justify-between mb-1.5">
                                <span className="text-xs text-slate-400 font-medium">{item.flag} {item.region}</span>
                                <span className="text-xs font-bold" style={{ color: item.color }}>{item.count} programs</span>
                            </div>
                            <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{ background: `linear-gradient(to right, ${item.color}60, ${item.color})` }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(item.count / programs.length) * 100}%` }}
                                    transition={{ duration: 0.8, delay: 0.8 + i * 0.1, ease: 'easeOut' }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* CTA card */}
            <motion.div
                className="glass-card p-5 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08))' }}
            >
                <div className="orb orb-purple absolute -top-5 right-0 w-24 h-24" />
                <h2 className="text-base font-bold text-white mb-1 relative">Ready to Apply?</h2>
                <p className="text-xs text-slate-400 mb-4 relative leading-relaxed">
                    Set your profile, see your match scores, and find your best-fit programs worldwide.
                </p>
                <motion.button
                    className="btn-tactile flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-xl relative"
                    style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.3)', color: '#a5b4fc' }}
                    onClick={onDiscover}
                    whileTap={{ scale: 0.95 }}
                >
                    Start Matching <ArrowRight size={13} />
                </motion.button>
            </motion.div>
        </div>
    )
}
