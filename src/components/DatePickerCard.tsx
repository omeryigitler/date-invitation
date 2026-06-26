import { useState } from 'react';
import { addDays, addMonths, differenceInCalendarDays, format, isBefore, startOfToday } from 'date-fns';
import { tr } from 'date-fns/locale';
import { motion, AnimatePresence } from 'motion/react';
import { CalendarHeart, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../lib/utils';

interface DatePickerCardProps {
  onSelect: (date: Date) => void;
}

interface FlipCardProps {
  label: string;
  value: string | number;
  onUp: () => void;
  onDown: () => void;
}

const FlipCard = ({ label, value, onUp, onDown }: FlipCardProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/35">{label}</span>
      <div className="group relative flex h-28 w-24 flex-col items-center justify-center overflow-hidden rounded-2xl border-b-[4px] border-[#8a2119] bg-[#c93a2f] shadow-[0_10px_24px_rgba(0,0,0,0.45)] sm:h-32 sm:w-28">
        <div className="absolute left-0 right-0 top-1/2 z-20 h-[2px] -translate-y-1/2 bg-black/50 shadow-[0_1px_0_rgba(255,255,255,0.2)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 bottom-1/2 z-10 bg-black/10" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-1/2 z-10 bg-white/5" />

        <button onClick={onUp} className="absolute inset-x-0 top-0 z-30 flex justify-center py-1 text-white/35 transition-colors hover:text-white">
          <ChevronUp size={17} />
        </button>
        <button onClick={onDown} className="absolute inset-x-0 bottom-0 z-30 flex justify-center py-1 text-white/35 transition-colors hover:text-white">
          <ChevronDown size={17} />
        </button>

        <AnimatePresence mode="popLayout">
          <motion.div
            key={String(value)}
            initial={{ rotateX: -90, opacity: 0, y: -5 }}
            animate={{ rotateX: 0, opacity: 1, y: 0 }}
            exit={{ rotateX: 90, opacity: 0, y: 5 }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
            className="z-10 flex flex-col items-center justify-center px-2 text-center text-white"
          >
            <span className={cn('font-mono font-bold drop-shadow-md', typeof value === 'number' ? 'text-5xl' : 'text-2xl uppercase tracking-tight')}>
              {typeof value === 'number' ? String(value).padStart(2, '0') : value}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

function getDefaultDate() {
  return addDays(startOfToday(), 1);
}

export default function DatePickerCard({ onSelect }: DatePickerCardProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(getDefaultDate);
  const [warningMsg, setWarningMsg] = useState<string | null>(null);
  const [warningCount, setWarningCount] = useState(0);

  const handleModifyDate = (type: 'month' | 'day', amount: number) => {
    let nextDate = new Date(selectedDate);

    if (type === 'month') {
      nextDate = addMonths(nextDate, amount);
    } else {
      nextDate = addDays(nextDate, amount);
    }

    if (isBefore(nextDate, startOfToday())) {
      setWarningMsg('Geçmiş bir tarih seçemeyiz. Biraz ileri alalım 🙂');
      return;
    }

    setWarningMsg(null);
    setWarningCount(0);
    setSelectedDate(nextDate);
  };

  const handleSelect = () => {
    if (isBefore(selectedDate, startOfToday())) {
      setWarningMsg('Geçmiş bir tarih seçemeyiz. Biraz ileri alalım 🙂');
      return;
    }

    const daysDiff = differenceInCalendarDays(selectedDate, startOfToday());

    if (daysDiff > 14) {
      const nextCount = warningCount + 1;
      setWarningCount(nextCount);
      setWarningMsg(
        nextCount >= 4
          ? 'Abartma!'
          : "2 haftadan sonrası çok uzak. Özlem seviyesi kritik sınıra ulaşabilir 😄",
      );
      return;
    }

    const dateOnly = new Date(selectedDate);
    dateOnly.setHours(0, 0, 0, 0);
    onSelect(dateOnly);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0c] font-mono shadow-[0_30px_90px_rgba(0,0,0,0.6)]"
    >
      {/* terminal üst bar */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.03] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate text-[11px] tracking-wide text-white/40">randevu — zsh — tarih</span>
      </div>

      <div className="relative px-6 py-7 text-center sm:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.08),transparent_42%)]" />

        <div className="relative">
          <p className="text-left text-white/55">
            <span className="text-[#28c840]">➜</span> <span className="text-[#7dd3fc]">~/randevu</span>{' '}
            <span className="text-white/80">./tarih_sec.sh</span>
          </p>

          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="mb-4 mt-5 flex justify-center text-[#d4af37] drop-shadow-[0_0_18px_rgba(212,175,55,0.2)]"
          >
            <CalendarHeart size={42} strokeWidth={1.5} />
          </motion.div>

          <h2 className="font-serif text-4xl italic leading-tight text-[#d4af37] drop-shadow-[0_0_22px_rgba(212,175,55,0.16)] sm:text-5xl">
            Hangi gün?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-balance text-xs leading-relaxed text-white/35">
            <span className="text-white/25">{'//'}</span> saati sonraki adımda netleştireceğiz, şimdi sadece günü seç
          </p>

          {/* seçilen tarih — terminal kutusu, romantik okuma korunur */}
          <div className="mt-6 rounded-lg border border-white/[0.08] bg-black/40 p-5">
            <div className="text-[11px] uppercase tracking-[0.28em] text-white/35">seçilen tarih</div>
            <div className="mt-2 font-serif text-3xl italic text-white sm:text-4xl">
              {format(selectedDate, 'EEEE', { locale: tr })}
            </div>
            <div className="mt-1 text-5xl font-bold tracking-tight text-[#d4af37] sm:text-6xl">
              {format(selectedDate, 'd', { locale: tr })}
            </div>
            <div className="mt-1 text-sm uppercase tracking-[0.22em] text-white/45">
              {format(selectedDate, 'MMMM yyyy', { locale: tr })}
            </div>
          </div>

          {/* flip kartlar — beğenilen alt kısım, korunuyor */}
          <div className="mt-6 flex select-none items-center justify-center gap-4">
            <FlipCard label="Ay" value={format(selectedDate, 'MMM', { locale: tr })} onUp={() => handleModifyDate('month', 1)} onDown={() => handleModifyDate('month', -1)} />
            <FlipCard label="Gün" value={selectedDate.getDate()} onUp={() => handleModifyDate('day', 1)} onDown={() => handleModifyDate('day', -1)} />
          </div>

          <AnimatePresence>
            {warningMsg && (
              <motion.div
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="mt-5 overflow-hidden"
              >
                <div className="rounded-lg border border-[#ff5f57]/30 bg-[#ff5f57]/10 p-3 text-left text-sm text-red-100">
                  <span className="font-bold text-[#ff5f57]">WARNING:</span> {warningMsg}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={handleSelect}
            className="mt-6 w-full rounded-lg bg-green-400 py-4 text-sm font-bold uppercase tracking-widest text-black transition-all hover:-translate-y-0.5 hover:bg-green-300 active:scale-95"
          >
            Bu günü seç
          </button>
        </div>
      </div>
    </motion.div>
  );
}
