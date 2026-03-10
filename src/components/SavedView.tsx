'use client'

import { motion } from 'framer-motion'
import { BookOpen, Trash2, ExternalLink } from 'lucide-react'

interface SavedViewProps {
    savedIds: Set<string>
    onRemove: (id: string) => void
}

export default function SavedView({ savedIds, onRemove }: SavedViewProps) {
    if (savedIds.size === 0) {
        return (
            <motion.div
                className="flex flex-col items-center justify-center py-24 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                    <BookOpen size={32} className="text-slate-600" />
                </div>
                <h2 className="text-base font-bold text-slate-400 mb-2">No Saved Programs</h2>
                <p className="text-xs text-slate-600 max-w-xs leading-relaxed">
                    Tap the bookmark icon on any program card to save it for later comparison.
                </p>
            </motion.div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <h2 className="text-sm font-bold text-white mb-4">
                Saved Programs ({savedIds.size})
            </h2>
            <div className="space-y-3">
                {Array.from(savedIds).map((id, i) => (
                    <motion.div
                        key={id}
                        className="glass-card p-4 flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 }}
                    >
                        <div className="flex-1">
                            <div className="text-sm font-semibold text-white">{id}</div>
                        </div>
                        <motion.button
                            className="btn-tactile w-8 h-8 rounded-xl flex items-center justify-center"
                            style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)' }}
                            onClick={() => onRemove(id)}
                            whileTap={{ scale: 0.85 }}
                            aria-label="Remove saved program"
                        >
                            <Trash2 size={13} className="text-red-400" />
                        </motion.button>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}
