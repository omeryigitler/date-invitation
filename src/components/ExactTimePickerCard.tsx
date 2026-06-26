import { useMemo, useState } from 'react';
import { format, isBefore } from 'date-fns';
import { tr } from 'date-fns/locale';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
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
      className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0c] font-mono shadow-[0_30px_90px_rgba(0,0,0,0.6)]"
    >
      {/* terminal üst bar */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.03] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate text-[11px] tracking-wide text-white/40">randevu — zsh — saat</span>
      </div>

      <div className="relative px-6 py-7 sm:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.08),transparent_42%)]" />

        <div className="relative">
          <p className="text-white/55">
            <span className="text-[#28c840]">➜</span> <span className="text-[#7dd3fc]">~/randevu</span>{' '}
            <span className="text-white/80">./saat_sec.sh --{mealTime.toLowerCase()}</span>
          </p>

          <div className="mb-6 mt-5 text-center">
            <h2 className="font-serif text-3xl italic leading-tight text-[#d4af37] drop-shadow-[0_0_22px_rgba(212,175,55,0.16)] sm:text-4xl">
              Saat kaçta?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-balance text-xs leading-relaxed text-white/35">
              <span className="text-white/25">{'//'}</span> {formattedDate} · {mealTime.toLowerCase()} saatini netleştirelim
            </p>
          </div>

          <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {slots.map(time => {
              const dateTime = combineDateAndTime(selectedDate, time);
              const disabled = isBefore(dateTime, new Date());

              return (
                <button
                  key={time}
                  disabled={disabled}
                  onClick={() => handleSelect(time)}
                  className="rounded-lg border border-white/10 bg-black/40 px-4 py-3.5 text-lg font-bold tracking-wide text-white transition-all hover:-translate-y-0.5 hover:border-green-400/50 hover:bg-green-400/10 hover:text-green-200 disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:translate-y-0 disabled:hover:border-white/10 disabled:hover:bg-black/40 disabled:hover:text-white"
                >
                  {time}
                </button>
              );
            })}
          </div>

          {allSlotsPast && (
            <p className="mb-4 rounded-lg border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-3 text-sm text-[#f0d486]">
              <span className="text-white/40">{'//'}</span> bu vakit için hazır saatler bugün geçti — aşağıdan dilediğin saati seç 🙂
            </p>
          )}

          <div className="rounded-lg border border-white/10 bg-black/40 p-4">
            <div className="mb-3 text-xs uppercase tracking-[0.2em] text-white/40">$ özel saat</div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="time"
                value={customTime}
                onChange={event => {
                  setCustomTime(event.target.value);
                  setError(null);
                }}
                className="min-h-12 flex-1 rounded-lg border border-white/10 bg-white/[0.04] px-4 text-base text-white outline-none transition focus:border-green-400/60"
              />
              <button
                onClick={handleCustomSelect}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-green-400 px-5 text-sm font-bold text-black transition hover:bg-green-300 active:scale-95"
              >
                → seç
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
                className="mt-4 rounded-lg border border-[#ff5f57]/30 bg-[#ff5f57]/10 px-4 py-3 text-sm text-red-100"
              >
                <span className="font-bold text-[#ff5f57]">WARNING:</span> {error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
