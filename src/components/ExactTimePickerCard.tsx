import { useMemo, useState } from 'react';
import { format, isBefore } from 'date-fns';
import { tr } from 'date-fns/locale';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Clock3, Sparkles } from 'lucide-react';
import type { MealTime } from '../types';

interface ExactTimePickerCardProps {
  selectedDate: Date;
  mealTime: MealTime;
  onSelect: (dateTime: Date) => void;
}

const slotsByMeal: Record<MealTime, string[]> = {
  Sabah: ['08:30', '09:00', '09:30', '10:00', '10:30', '11:00'],
  Öğle: ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30'],
  Akşam: ['18:30', '19:00', '19:30', '20:00', '20:30', '21:00'],
};

function combineDateAndTime(date: Date, time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  const result = new Date(date);
  result.setHours(hours, minutes, 0, 0);
  return result;
}

export default function ExactTimePickerCard({ selectedDate, mealTime, onSelect }: ExactTimePickerCardProps) {
  const [customTime, setCustomTime] = useState('');
  const [error, setError] = useState<string | null>(null);

  const slots = useMemo(() => slotsByMeal[mealTime], [mealTime]);
  const allSlotsPast = useMemo(
    () => slots.every(time => isBefore(combineDateAndTime(selectedDate, time), new Date())),
    [slots, selectedDate],
  );
  const formattedDate = format(selectedDate, 'd MMMM yyyy, EEEE', { locale: tr });

  const handleSelect = (time: string) => {
    const dateTime = combineDateAndTime(selectedDate, time);

    if (isBefore(dateTime, new Date())) {
      setError('Bu saat geçmişte kaldı. Biraz daha ileri bir saat seçelim 🙂');
      return;
    }

    onSelect(dateTime);
  };

  const handleCustomSelect = () => {
    if (!customTime) {
      setError('Önce bir saat seçmelisin.');
      return;
    }

    handleSelect(customTime);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card relative w-full max-w-2xl overflow-hidden rounded-[2rem] px-6 py-8 text-center sm:px-10 sm:py-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(201,58,47,0.08),transparent_32%)]" />
      <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />

      <div className="relative mb-8 flex flex-col items-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#d4af37]/25 bg-white/[0.04] text-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.14)]">
          <Clock3 size={25} />
        </div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#d4af37]/80">
          {mealTime} planı
        </p>
        <h2 className="font-serif text-3xl italic leading-tight text-white sm:text-4xl">
          Saat kaçta buluşalım?
        </h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/55 sm:text-base">
          {formattedDate} için {mealTime.toLowerCase()} saatini netleştirelim.
        </p>
      </div>

      <div className="relative mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {slots.map(time => {
          const dateTime = combineDateAndTime(selectedDate, time);
          const disabled = isBefore(dateTime, new Date());

          return (
            <button
              key={time}
              disabled={disabled}
              onClick={() => handleSelect(time)}
              className="rounded-2xl border border-[#d4af37]/20 bg-black/35 px-4 py-4 font-mono text-lg font-bold tracking-wide text-white transition-all hover:-translate-y-0.5 hover:border-[#d4af37]/55 hover:bg-[#d4af37]/10 disabled:cursor-not-allowed disabled:opacity-30"
            >
              {time}
            </button>
          );
        })}
      </div>

      {allSlotsPast && (
        <p className="relative mb-4 rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-3 text-sm text-[#f0d486]">
          Bu vakit için hazır saatler bugün geçti. Aşağıdan dilediğin saati seçebilirsin 🙂
        </p>
      )}

      <div className="relative rounded-2xl border border-white/10 bg-black/35 p-4 text-left">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/40">
          <Sparkles size={14} className="text-[#d4af37]" />
          Özel saat
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="time"
            value={customTime}
            onChange={event => {
              setCustomTime(event.target.value);
              setError(null);
            }}
            className="min-h-12 flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 font-mono text-base text-white outline-none transition focus:border-[#d4af37]/60"
          />
          <button
            onClick={handleCustomSelect}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-5 text-sm font-semibold text-black transition hover:scale-[1.02] active:scale-95"
          >
            Bu saati seç
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="relative mt-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
