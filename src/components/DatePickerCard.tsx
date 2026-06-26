import { useEffect, useMemo, useState } from 'react';
import {
  addDays,
  addHours,
  addMinutes,
  addMonths,
  differenceInCalendarDays,
  format,
  isBefore,
  startOfToday,
} from 'date-fns';
import { tr } from 'date-fns/locale';
import { motion, AnimatePresence } from 'motion/react';
import { CalendarHeart, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../lib/utils';

interface DatePickerCardProps {
  onSelect: (date: Date) => void;
}

interface InteractiveFlipCardProps {
  topText?: string;
  bottomText?: string;
  value?: string | number;
  onUp?: () => void;
  onDown?: () => void;
  disabled?: boolean;
}

const InteractiveFlipCard = ({ topText, bottomText, value, onUp, onDown, disabled }: InteractiveFlipCardProps) => {
  return (
    <div
      className={cn(
        'group relative flex h-24 w-16 flex-col items-center justify-center overflow-hidden rounded-xl border-b-[4px] border-[#8a2119] bg-[#c93a2f] shadow-[0_10px_20px_rgba(0,0,0,0.4)] sm:h-28 sm:w-20',
        disabled && 'pointer-events-none opacity-90',
      )}
    >
      <div className="absolute left-0 right-0 top-1/2 z-20 h-[2px] -translate-y-1/2 bg-black/50 shadow-[0_1px_0_rgba(255,255,255,0.2)]" />
      <div className="absolute left-0 top-1/2 z-20 h-3 w-1 -translate-y-1/2 rounded-r-sm bg-black/80" />
      <div className="absolute right-0 top-1/2 z-20 h-3 w-1 -translate-y-1/2 rounded-l-sm bg-black/80" />
      <div className="pointer-events-none absolute inset-x-0 top-0 bottom-1/2 z-10 bg-black/10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-1/2 z-10 bg-white/5" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-full bg-gradient-to-b from-white/10 to-transparent opacity-50" />

      {onUp && !disabled && (
        <button onClick={onUp} className="absolute inset-x-0 top-0 z-30 flex cursor-pointer justify-center py-1 text-white/30 transition-colors hover:text-white">
          <ChevronUp size={16} />
        </button>
      )}

      {onDown && !disabled && (
        <button onClick={onDown} className="absolute inset-x-0 bottom-0 z-30 flex cursor-pointer justify-center py-1 text-white/30 transition-colors hover:text-white">
          <ChevronDown size={16} />
        </button>
      )}

      <div className="pointer-events-none z-10 mt-1 flex h-full w-full flex-col items-center justify-center">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`${value}-${topText}-${bottomText}`}
            initial={{ rotateX: -90, opacity: 0, y: -5 }}
            animate={{ rotateX: 0, opacity: 1, y: 0 }}
            exit={{ rotateX: 90, opacity: 0, y: 5 }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
            className="flex flex-col items-center justify-center text-white"
            style={{ transformOrigin: 'center' }}
          >
            {value !== undefined ? (
              <span className="font-mono text-[2.2rem] font-bold tracking-tighter drop-shadow-md sm:text-5xl">
                {String(value).padStart(2, '0')}
              </span>
            ) : (
              <div className="flex flex-col items-center justify-center gap-0.5">
                <span className="text-lg font-bold uppercase tracking-wider drop-shadow-md sm:text-xl">{topText}</span>
                {bottomText && <span className="font-mono text-base font-bold drop-shadow-md sm:text-lg">{bottomText}</span>}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

function getDefaultDate() {
  const now = new Date();
  const date = new Date(now);
  date.setHours(19, 30, 0, 0);

  if (isBefore(date, now)) {
    date.setDate(date.getDate() + 1);
  }

  return date;
}

export default function DatePickerCard({ onSelect }: DatePickerCardProps) {
  const targetDate = useMemo(getDefaultDate, []);
  const [displayDate, setDisplayDate] = useState<Date>(() => {
    const date = new Date(targetDate);
    date.setDate(date.getDate() - 2);
    date.setHours(8, 0, 0, 0);
    return date;
  });
  const [selectedDate, setSelectedDate] = useState<Date>(targetDate);
  const [isAnimating, setIsAnimating] = useState(true);
  const [warningMsg, setWarningMsg] = useState<string | null>(null);
  const [warningCount, setWarningCount] = useState(0);

  useEffect(() => {
    let current = new Date(displayDate);

    const interval = window.setInterval(() => {
      const diff = targetDate.getTime() - current.getTime();

      if (diff <= 0) {
        window.clearInterval(interval);
        setDisplayDate(targetDate);
        setSelectedDate(targetDate);
        setIsAnimating(false);
        return;
      }

      const step = Math.min(diff, 4 * 60 * 60 * 1000);
      current = new Date(current.getTime() + step);
      setDisplayDate(new Date(current));
    }, 40);

    return () => window.clearInterval(interval);
    // We only want the intro animation to run once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleModifyDate = (type: 'month' | 'day' | 'hour' | 'minute', amount: number) => {
    if (isAnimating) return;

    let nextDate = new Date(selectedDate);

    switch (type) {
      case 'month':
        nextDate = addMonths(nextDate, amount);
        break;
      case 'day':
        nextDate = addDays(nextDate, amount);
        break;
      case 'hour':
        nextDate = addHours(nextDate, amount);
        break;
      case 'minute':
        nextDate = addMinutes(nextDate, amount);
        break;
    }

    if (isBefore(nextDate, new Date())) {
      setWarningMsg('Geçmiş bir tarih veya saat seçemezsin. Biraz ileri alalım 🙂');
      return;
    }

    setWarningMsg(null);
    setWarningCount(0);
    setSelectedDate(nextDate);
    setDisplayDate(nextDate);
  };

  const handleSelect = () => {
    if (isAnimating) return;

    if (isBefore(selectedDate, new Date())) {
      setWarningMsg('Geçmiş bir tarih veya saat seçemezsin. Biraz ileri alalım 🙂');
      return;
    }

    const daysDiff = differenceInCalendarDays(selectedDate, startOfToday());

    if (daysDiff > 14) {
      const nextCount = warningCount + 1;
      setWarningCount(nextCount);
      setWarningMsg(
        nextCount >= 4
          ? 'Abartma!'
          : "> WARNING: 'Özlem_Seviyesi' kritik sınıra ulaşacak. 2 hafta çok uzun, lütfen takvimi biraz daha erkene al! 🚨",
      );
      return;
    }

    onSelect(selectedDate);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card flex w-full max-w-[95vw] flex-col items-center rounded-3xl border border-white/5 bg-[#1c1c24] p-6 shadow-2xl sm:max-w-fit sm:p-8"
    >
      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} className="mb-6 text-[#d4af37]">
        <CalendarHeart size={48} strokeWidth={1.5} />
      </motion.div>

      <h2 className="mb-8 text-center font-serif text-4xl leading-tight text-white md:text-5xl">
        Buluşma Zamanımızı<br />
        <span className="accent-gold italic">seçelim</span>
      </h2>

      <div className="mb-8 flex w-full select-none items-center justify-center gap-1.5 sm:gap-3">
        <div className="flex gap-1 sm:gap-2">
          <InteractiveFlipCard topText={format(displayDate, 'MMM', { locale: tr })} onUp={() => handleModifyDate('month', 1)} onDown={() => handleModifyDate('month', -1)} disabled={isAnimating} />
          <InteractiveFlipCard value={displayDate.getDate()} onUp={() => handleModifyDate('day', 1)} onDown={() => handleModifyDate('day', -1)} disabled={isAnimating} />
        </div>

        <div className="w-1 sm:w-2" />

        <div className="flex items-center gap-1 sm:gap-2">
          <InteractiveFlipCard value={displayDate.getHours()} onUp={() => handleModifyDate('hour', 1)} onDown={() => handleModifyDate('hour', -1)} disabled={isAnimating} />
          <div className="mx-1 flex flex-col gap-2 pb-2">
            <div className="h-1.5 w-1.5 rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            <div className="h-1.5 w-1.5 rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          </div>
          <InteractiveFlipCard value={displayDate.getMinutes()} onUp={() => handleModifyDate('minute', 15)} onDown={() => handleModifyDate('minute', -15)} disabled={isAnimating} />
        </div>
      </div>

      <AnimatePresence>
        {warningMsg && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="mb-4 w-full overflow-hidden"
          >
            <div className="rounded-xl border border-[#df3f2f]/50 bg-[#df3f2f]/20 p-4 text-center text-sm font-medium text-[#df3f2f] shadow-[0_0_15px_rgba(223,63,47,0.2)] md:text-base">
              {warningMsg === 'Abartma!' || warningMsg.startsWith('Geçmiş') ? (
                warningMsg
              ) : (
                <div className="flex w-full flex-col items-start gap-4 overflow-x-auto overflow-y-hidden whitespace-nowrap pb-2 text-left font-mono text-[0.8rem] leading-relaxed sm:text-sm">
                  <div className="mb-2 w-full text-center font-bold text-red-500">{'[!] SYSTEM ERROR [!]'}</div>
                  <div>
                    <span className="font-bold text-yellow-400">WARNING:</span>
                    {" 'Özlem_Seviyesi' kritik eşiği aşıyor! 🚨"}
                  </div>
                  <div>
                    <span className="font-bold text-yellow-400">LOADING...:</span>
                    {' Hata: 14_gün_cok_uzun.exe çalıştırılamadı. ⚠️'}
                  </div>
                  <div>
                    <span className="font-bold text-yellow-400">ACTION REQUIRED:</span>
                    {' Devrelerin yanmaması için lütfen takvimi acilen daha erkene alınız. ⏳'}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        disabled={isAnimating}
        onClick={handleSelect}
        className="mt-2 w-full rounded-full bg-gradient-to-r from-[#df3f2f] to-[#f45c4e] py-4 text-sm font-semibold uppercase tracking-widest text-white transition-all hover:shadow-[0_0_20px_rgba(223,63,47,0.4)] active:scale-95 disabled:opacity-50 disabled:grayscale"
      >
        Tarihi Onayla
      </button>
    </motion.div>
  );
}
