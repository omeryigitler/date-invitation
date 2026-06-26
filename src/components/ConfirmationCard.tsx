import Confetti from 'react-confetti';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { motion } from 'motion/react';
import { Calendar, Clock, PartyPopper, Utensils } from 'lucide-react';
import type { DateDetails } from '../types';
import { useWindowSize } from '../lib/useWindowSize';

interface ConfirmationCardProps {
  details: DateDetails;
}

export default function ConfirmationCard({ details }: ConfirmationCardProps) {
  const { width, height } = useWindowSize();
  const formattedDate = details.dateTime ? format(details.dateTime, 'd MMMM yyyy, EEEE', { locale: tr }) : '';
  const formattedTime = details.dateTime ? format(details.dateTime, 'HH:mm') : '';

  return (
    <>
      <Confetti width={width} height={height} recycle={false} numberOfPieces={500} colors={['#d4af37', '#b8962d', '#ffffff', '#aaaaaa', '#333333']} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card relative z-10 w-full max-w-md rounded-3xl p-8"
      >
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#d4af37]">
            <PartyPopper size={32} />
          </div>
          <h2 className="mb-2 text-center font-serif text-3xl italic text-white">Harika!</h2>
          <p className="mb-4 text-center text-[10px] font-semibold uppercase tracking-widest text-[#d4af37]">Planımız hazır. Sabırsızlanıyorum!</p>
        </div>

        <div className="space-y-4 rounded-2xl border border-white/10 bg-black/40 p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/5 bg-white/5 text-[#d4af37]">
              <Calendar size={20} />
            </div>
            <div>
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Tarih</div>
              <div className="font-serif italic text-white">{formattedDate}</div>
            </div>
          </div>

          <div className="h-px w-full bg-white/10" />

          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/5 bg-white/5 text-[#d4af37]">
              <Clock size={20} />
            </div>
            <div>
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Zaman</div>
              <div className="font-serif italic text-white">
                {details.mealTime} {formattedTime && `• ${formattedTime}`}
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-white/10" />

          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/5 bg-white/5 text-[#d4af37]">
              <Utensils size={20} />
            </div>
            <div>
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Menü</div>
              <div className="font-serif italic text-white">{details.food}</div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[10px] uppercase tracking-widest text-white/30">Ekran görüntüsü alıp bana göndermeyi unutma!</p>
        </div>
      </motion.div>
    </>
  );
}
