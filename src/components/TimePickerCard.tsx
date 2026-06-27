import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Moon, Sun, Sunrise } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';
import type { MealTime } from '../types';

interface TimePickerCardProps {
  onSelect: (time: MealTime) => void;
}

type MoodOption = {
  id: MealTime;
  index: string;
  title: string;
  description: string;
  icon: ReactNode;
  image: string;
};

const options: MoodOption[] = [
  {
    id: 'Sabah',
    index: '01',
    title: 'Güne birlikte başlayalım',
    description: 'Kahvaltı, kahve ve sakin bir başlangıç.',
    icon: <Sunrise size={22} />,
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'Öğle',
    index: '02',
    title: 'Günün ortasında küçük bir kaçış',
    description: 'Tatlı bir mola ve enerjik bir buluşma.',
    icon: <Sun size={22} />,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'Akşam',
    index: '03',
    title: 'Gecenin en güzel planı',
    description: 'Daha romantik ve daha etkileyici bir akşam.',
    icon: <Moon size={22} />,
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function TimePickerCard({ onSelect }: TimePickerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0c] font-mono shadow-[0_30px_90px_rgba(0,0,0,0.6)]"
    >
      {/* terminal üst bar */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.03] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate text-[11px] tracking-wide text-white/40">randevu — zsh — vakit</span>
      </div>

      <div className="relative px-6 py-7 sm:px-8 sm:py-9">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.08),transparent_38%)]" />

        <div className="relative">
          <p className="text-white/55">
            <span className="text-[#28c840]">➜</span> <span className="text-[#7dd3fc]">~/randevu</span>{' '}
            <span className="text-white/80">./vakit_sec.sh</span>
          </p>

          <div className="mb-7 mt-5 text-center">
            <h2 className="font-serif text-3xl italic leading-tight text-[#d4af37] drop-shadow-[0_0_22px_rgba(212,175,55,0.16)] sm:text-4xl">
              Hangi vakitte buluşalım?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-balance text-xs leading-relaxed text-white/35">
              <span className="text-white/25">{'//'}</span> önce buluşmanın havasını seç, tam saati bir sonraki adımda soracağım
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {options.map((option, index) => (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => onSelect(option.id)}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0c0c10] text-left transition-colors duration-300 hover:border-green-400/45"
              >
                <div className="relative h-44 overflow-hidden sm:h-52">
                  <ImageWithFallback
                    src={option.image}
                    alt={`${option.id} buluşma atmosferi`}
                    label={option.id}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0c0c10]" />
                  <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-black/55 text-[#d4af37] backdrop-blur-md">
                    {option.icon}
                  </div>
                  <div className="absolute right-4 top-4 text-xs text-white/45">{option.index}</div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="text-[11px] uppercase tracking-[0.24em] text-green-400/80">{option.id}</div>
                  <h3 className="mt-2 font-serif text-xl italic leading-tight text-white">{option.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/55">{option.description}</p>
                  <div className="mt-auto flex items-center gap-2 pt-4 text-sm font-semibold text-green-300 transition-colors">
                    <span>→ bu vakti seç</span>
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
