'use client'

import { motion } from 'framer-motion'
import { GraduationCap, MapPin, Star, ChevronRight, Info } from 'lucide-react'

export default function ProfileView() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
        >
            {/* Profile card */}
            <div className="glass-card p-5 text-center relative overflow-hidden">
                <div className="orb orb-purple absolute top-0 right-0 w-28 h-28 opacity-30" />
                <div
                    className="w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center text-2xl"
                    style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
                >
                    🎓
                </div>
                <h2 className="text-base font-bold text-white mb-1">UBCO Graduate</h2>
                <p className="text-xs text-slate-400 mb-3">Bachelor of Management · Class of 2024</p>
                <div className="flex items-center justify-center gap-2">
                    <MapPin size={12} className="text-slate-500" />
                    <span className="text-xs text-slate-500">Kelowna, BC, Canada</span>
                </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3">
                {[
                    { label: 'GPA', value: '3.3', icon: Star, color: '#60a5fa' },
                    { label: 'Programs', value: '10', icon: GraduationCap, color: '#34d399' },
                    { label: 'Saved', value: '0', icon: GraduationCap, color: '#a78bfa' },
                ].map(({ label, value, color }) => (
                    <div
                        key={label}
                        className="glass-card p-3 text-center"
                    >
                        <div className="text-xl font-black mb-1" style={{ color }}>{value}</div>
                        <div className="text-[10px] text-slate-500">{label}</div>
                    </div>
                ))}
            </div>

            {/* Settings / links */}
            <div className="glass-card overflow-hidden">
                {[
                    { label: 'About GradFlow', icon: Info, href: '#' },
                    { label: 'UBCO Official Site', icon: GraduationCap, href: 'https://ok.ubc.ca/graduate-professional-education/' },
                    { label: 'How Match Scores Work', icon: Star, href: '#' },
                ].map((item, i) => (
                    <motion.a
                        key={item.label}
                        href={item.href}
                        target={item.href === '#' ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        className="btn-tactile flex items-center justify-between px-4 py-3.5 border-b last:border-b-0"
                        style={{ borderColor: 'rgba(255,255,255,0.05)' }}
                        whileTap={{ scale: 0.99, backgroundColor: 'rgba(255,255,255,0.03)' }}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                    >
                        <div className="flex items-center gap-3">
                            <item.icon size={14} className="text-slate-500" />
                            <span className="text-sm text-slate-300 font-medium">{item.label}</span>
                        </div>
                        <ChevronRight size={14} className="text-slate-600" />
                    </motion.a>
                ))}
            </div>

            <p className="text-center text-[10px] text-slate-600 pb-2">
                GradFlow v1.0 · Built for UBCO Graduates · Data as of 2025–2026
            </p>
        </motion.div>
    )
}
