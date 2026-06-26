import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Clock, Moon, Sun, Sunrise } from 'lucide-react';
import type { MealTime } from '../types';

interface TimePickerCardProps {
  onSelect: (time: MealTime) => void;
}

const times: { id: MealTime; label: string; icon: ReactNode; desc: string }[] = [
  { id: 'Sabah', label: 'Kahvaltı', icon: <Sunrise size={24} />, desc: 'Güne harika başlamak için' },
  { id: 'Öğle', label: 'Öğle Yemeği', icon: <Sun size={24} />, desc: 'Günün ortasında tatlı bir mola' },
  { id: 'Akşam', label: 'Akşam Yemeği', icon: <Moon size={24} />, desc: 'Romantik ve şık bir akşam' },
];

export default function TimePickerCard({ onSelect }: TimePickerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card w-full max-w-md rounded-3xl p-8"
    >
      <div className="mb-8 flex flex-col items-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#d4af37]">
          <Clock size={24} />
        </div>
        <h2 className="text-center font-serif text-2xl italic text-white">Ne zaman buluşalım?</h2>
      </div>

      <div className="flex flex-col gap-4">
        {times.map((time, index) => (
          <motion.button
            key={time.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(time.id)}
            className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition-all hover:border-[#d4af37]/50 hover:bg-white/10"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/5 bg-black/40 text-[#d4af37] transition-transform group-hover:scale-110">
              {time.icon}
            </div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-wider text-white">{time.label}</div>
              <div className="font-serif text-xs italic text-white/50">{time.desc}</div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
