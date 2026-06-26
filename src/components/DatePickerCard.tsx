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
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card relative flex w-full max-w-2xl flex-col items-center overflow-hidden rounded-[2rem] border border-white/5 bg-[#1c1c24] p-6 text-center shadow-2xl sm:p-9"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.12),transparent_32%)]" />
      <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent" />

      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} className="relative mb-5 text-[#d4af37]">
        <CalendarHeart size={46} strokeWidth={1.5} />
      </motion.div>

      <div className="relative mb-7 w-full">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#d4af37]/80">Önce tarihi seçelim</p>
        <h2 className="font-serif text-4xl italic leading-tight text-white md:text-5xl">Hangi gün?</h2>
        <p className="mx-auto mt-3 max-w-sm text-balance text-[clamp(0.78rem,2.4vw,1rem)] leading-relaxed text-white/55 sm:max-w-md sm:whitespace-nowrap">
          Saati bir sonraki adımda netleştireceğiz. Şimdi sadece günü seç.
        </p>
      </div>

      <div className="relative mb-7 w-full rounded-[1.5rem] border border-[#d4af37]/20 bg-black/35 p-5 shadow-[0_0_45px_rgba(212,175,55,0.08)]">
        <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/35">Seçilen tarih</div>
        <div className="mt-2 font-serif text-3xl italic text-white sm:text-4xl">
          {format(selectedDate, 'EEEE', { locale: tr })}
        </div>
        <div className="mt-1 text-5xl font-bold tracking-tight text-[#d4af37] sm:text-6xl">
          {format(selectedDate, 'd', { locale: tr })}
        </div>
        <div className="mt-1 text-sm font-medium uppercase tracking-[0.22em] text-white/55">
          {format(selectedDate, 'MMMM yyyy', { locale: tr })}
        </div>
      </div>

      <div className="relative mb-7 flex w-full select-none items-center justify-center gap-4">
        <FlipCard label="Ay" value={format(selectedDate, 'MMM', { locale: tr })} onUp={() => handleModifyDate('month', 1)} onDown={() => handleModifyDate('month', -1)} />
        <FlipCard label="Gün" value={selectedDate.getDate()} onUp={() => handleModifyDate('day', 1)} onDown={() => handleModifyDate('day', -1)} />
      </div>

      <AnimatePresence>
        {warningMsg && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="relative mb-4 w-full overflow-hidden"
          >
            <div className="rounded-xl border border-[#df3f2f]/50 bg-[#df3f2f]/20 p-4 text-center text-sm font-medium text-red-100 shadow-[0_0_15px_rgba(223,63,47,0.2)]">
              {warningMsg}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={handleSelect}
        className="relative mt-1 w-full rounded-full bg-gradient-to-r from-[#df3f2f] to-[#f45c4e] py-4 text-sm font-semibold uppercase tracking-widest text-white transition-all hover:shadow-[0_0_20px_rgba(223,63,47,0.4)] active:scale-95"
      >
        Bu günü seç
      </button>
    </motion.div>
  );
}
