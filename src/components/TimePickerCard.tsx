import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Moon, Sparkles, Sun, Sunrise } from 'lucide-react';
import type { MealTime } from '../types';

interface TimePickerCardProps {
  onSelect: (time: MealTime) => void;
}

type MoodOption = {
  id: MealTime;
  eyebrow: string;
  title: string;
  description: string;
  icon: ReactNode;
  image: string;
  accent: string;
  glow: string;
  border: string;
};

const options: MoodOption[] = [
  {
    id: 'Sabah',
    eyebrow: 'Sabah',
    title: 'Güne birlikte başlayalım',
    description: 'Sıcak bir kahvaltı, sakin bir başlangıç ve güzel bir sabah hissi.',
    icon: <Sunrise size={28} />,
    image: 'https://images.unsplash.com/photo-149 sunrise?auto=format&fit=crop&w=1200&q=80',
    accent: 'text-[#f6c35b]',
    glow: 'shadow-[0_0_55px_rgba(246,195,91,0.16)]',
    border: 'border-[#f6c35b]/25 hover:border-[#f6c35b]/55',
  },
  {
    id: 'Öğle',
    eyebrow: 'Öğle',
    title: 'Günün ortasında küçük bir kaçış',
    description: 'Tatlı bir mola, enerjik bir buluşma ve günün en keyifli saati.',
    icon: <Sun size={28} />,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    accent: 'text-[#e8d59a]',
    glow: 'shadow-[0_0_55px_rgba(232,213,154,0.13)]',
    border: 'border-[#e8d59a]/25 hover:border-[#e8d59a]/55',
  },
  {
    id: 'Akşam',
    eyebrow: 'Akşam',
    title: 'Gecenin en güzel planı',
    description: 'Daha romantik, daha etkileyici ve unutulmayacak bir akşam buluşması.',
    icon: <Moon size={28} />,
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=80',
    accent: 'text-[#d4af37]',
    glow: 'shadow-[0_0_65px_rgba(212,175,55,0.2)]',
    border: 'border-[#d4af37]/30 hover:border-[#d4af37]/65',
  },
];

export default function TimePickerCard({ onSelect }: TimePickerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card relative w-full max-w-6xl overflow-hidden rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.08),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent" />

      <div className="relative mb-8 flex flex-col items-center text-center sm:mb-10">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#d4af37]/20 bg-white/[0.03] text-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.12)]">
          <Sparkles size={24} />
        </div>

        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#d4af37]/80">
          Bir an seç
        </p>

        <h2 className="font-serif text-3xl italic leading-tight text-white sm:text-4xl md:text-5xl">
          Ne zaman buluşalım?
        </h2>

        <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
          Sadece bir saat değil, birlikte yaşayacağımız havayı seç.
        </p>
      </div>

      <div className="relative grid grid-cols-1 gap-5 md:grid-cols-3">
        {options.map((option, index) => (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -6, scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            onClick={() => onSelect(option.id)}
            className={`group relative min-h-[390px] overflow-hidden rounded-[1.75rem] border text-left transition-all duration-300 ${option.border} ${option.glow}`}
          >
            <img
              src={option.image}
              alt={`${option.eyebrow} buluşma atmosferi`}
              className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-85"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/58 to-black/92" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.22),transparent_34%)] opacity-70" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

            <div className="relative z-10 flex min-h-[390px] flex-col p-6">
              <div className={`mb-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-black/45 backdrop-blur-md ${option.accent}`}>
                {option.icon}
              </div>

              <div className="mt-10">
                <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/50">
                  {option.eyebrow}
                </div>

                <h3 className="mb-3 font-serif text-[1.85rem] italic leading-[1.03] text-white drop-shadow-xl sm:text-[2.05rem]">
                  {option.title}
                </h3>

                <p className="mb-8 text-sm font-medium leading-7 text-white/78 sm:text-[15px]">
                  {option.description}
                </p>

                <div className="flex items-center justify-between gap-3 text-sm font-semibold text-white/82 transition-colors group-hover:text-white">
                  <span>Bu an kulağa güzel geliyor</span>
                  <ArrowRight size={16} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
