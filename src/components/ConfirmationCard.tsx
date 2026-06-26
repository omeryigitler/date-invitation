import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { motion } from 'motion/react';
import { Check, Share2 } from 'lucide-react';
import type { DateDetails } from '../types';

interface ConfirmationCardProps {
  details: DateDetails;
}

const CONFETTI_COLORS = ['#4ade80', '#d4af37', '#ffffff', '#22c55e', '#9ca3af'];

export default function ConfirmationCard({ details }: ConfirmationCardProps) {
  const [copied, setCopied] = useState(false);
  const formattedDate = details.dateTime ? format(details.dateTime, 'd MMMM yyyy, EEEE', { locale: tr }) : '';
  const formattedTime = details.dateTime ? format(details.dateTime, 'HH:mm') : '';

  const rows = [
    { key: 'tarih', value: formattedDate },
    { key: 'saat', value: [details.mealTime, formattedTime].filter(Boolean).join(' · ') },
    { key: 'menu', value: details.food ?? '' },
  ];

  const shareText = [
    'buluşma planı: derlendi ✓',
    `📅 ${formattedDate}`,
    `🕘 ${[details.mealTime, formattedTime].filter(Boolean).join(' · ')}`,
    `🍽️ ${details.food ?? ''}`,
  ].join('\n');

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Buluşma Planı', text: shareText });
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
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0c] font-mono shadow-[0_30px_90px_rgba(0,0,0,0.6)]"
    >
      {/* terminal üst bar */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.03] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate text-[11px] tracking-wide text-white/40">randevu — zsh — onaylandı ✓</span>
      </div>

      {/* terminal gövde */}
      <div className="space-y-1.5 p-5 text-[13px] leading-relaxed sm:p-6 sm:text-sm">
        <p className="text-white/55">
          <span className="text-[#28c840]">➜</span> <span className="text-[#7dd3fc]">~/randevu</span>{' '}
          <span className="text-white/80">./planla.sh --onayla</span>
        </p>

        <p className="text-green-400">✓ bağlantı kuruldu</p>
        <p className="text-green-400">
          ✓ plan derlendi <span className="text-white/35">(0 hata, 1 ❤️)</span>
        </p>
        <p className="text-green-400">✓ deploy başarılı</p>

        <div className="my-4 rounded-lg border border-white/[0.08] bg-black/40 p-4">
          <p className="mb-2 text-white/35">$ cat randevu.json</p>
          <p className="text-white/70">{'{'}</p>
          {rows.map(row => (
            <p key={row.key} className="break-words pl-5">
              <span className="text-[#7dd3fc]">&quot;{row.key}&quot;</span>
              <span className="text-white/40">: </span>
              <span className="text-[#d4af37]">&quot;{row.value}&quot;</span>
              <span className="text-white/40">,</span>
            </p>
          ))}
          <p className="text-white/70">{'}'}</p>
        </div>

        <p className="text-white/70">
          <span className="font-semibold text-green-400">STATUS</span>: 200 OK — görüşmek üzere
          <motion.span
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ repeat: Infinity, duration: 1, times: [0, 0.5, 0.51, 1] }}
            className="ml-1 inline-block h-4 w-2 translate-y-0.5 bg-green-400 align-middle"
          />
        </p>

        <p className="pt-0.5 text-white/30">
          <span className="text-white/25">{'//'}</span> TODO: heyecanı gizle → <span className="text-[#ff5f57]">FAILED</span>
        </p>

        <button
          onClick={handleShare}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-green-400/40 bg-green-400/10 px-5 py-3 text-sm font-semibold text-green-300 transition hover:bg-green-400/20 active:scale-[0.98]"
        >
          {copied ? <Check size={16} /> : <Share2 size={16} />}
          {copied ? 'panoya kopyalandı ✓' : '$ planı_paylaş'}
        </button>

        <p className="pt-2 text-center text-[11px] text-white/25">git push origin kalbim — gerisini bana bırak</p>
      </div>
    </motion.div>
  );
}
