import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { motion } from 'motion/react';
import { Calendar, Check, Clock, PartyPopper, Share2, Utensils } from 'lucide-react';
import type { DateDetails } from '../types';

interface ConfirmationCardProps {
  details: DateDetails;
}

const CONFETTI_COLORS = ['#d4af37', '#b8962d', '#ffffff', '#aaaaaa', '#333333'];

export default function ConfirmationCard({ details }: ConfirmationCardProps) {
  const [copied, setCopied] = useState(false);
  const formattedDate = details.dateTime ? format(details.dateTime, 'd MMMM yyyy, EEEE', { locale: tr }) : '';
  const formattedTime = details.dateTime ? format(details.dateTime, 'HH:mm') : '';

  const shareText = [
    'Buluşma planımız hazır! 💛',
    `📅 ${formattedDate}`,
    `🕘 ${details.mealTime}${formattedTime ? ` • ${formattedTime}` : ''}`,
    `🍽️ ${details.food}`,
  ].join('\n');

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Buluşma Planımız', text: shareText });
      } catch {
        // paylaşım iptal edildi — sessizce geç
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // pano erişimi yoksa sessizce geç
    }
  };

  useEffect(() => {
    confetti({ particleCount: 160, spread: 75, origin: { y: 0.6 }, colors: CONFETTI_COLORS });

    const sideBurst = window.setTimeout(() => {
      confetti({ particleCount: 80, angle: 60, spread: 70, origin: { x: 0 }, colors: CONFETTI_COLORS });
      confetti({ particleCount: 80, angle: 120, spread: 70, origin: { x: 1 }, colors: CONFETTI_COLORS });
    }, 250);

    return () => window.clearTimeout(sideBurst);
  }, []);

  return (
    <>
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

        <div className="mt-8 flex flex-col items-center gap-3">
          <button
            onClick={handleShare}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#d4af37] px-6 text-sm font-semibold text-black transition hover:scale-[1.02] active:scale-95"
          >
            {copied ? <Check size={17} /> : <Share2 size={17} />}
            {copied ? 'Panoya kopyalandı!' : 'Planı paylaş'}
          </button>
          <p className="text-center text-[10px] uppercase tracking-widest text-white/30">Planı bana gönder, gerisini bana bırak 💛</p>
        </div>
      </motion.div>
    </>
  );
}
