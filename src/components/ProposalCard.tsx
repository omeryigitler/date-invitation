import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';
import { cn } from '../lib/utils';

interface ProposalCardProps {
  onYes: () => void;
}

const TITLE_BAR = (
  <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.03] px-4 py-3">
    <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
    <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
    <span className="h-3 w-3 rounded-full bg-[#28c840]" />
    <span className="ml-2 truncate text-[11px] tracking-wide text-white/40">randevu — zsh — teklif</span>
  </div>
);

export default function ProposalCard({ onYes }: ProposalCardProps) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [isMoved, setIsMoved] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [typedChars, setTypedChars] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const line1 = '> sudo date_teklifi_et';
  const line2 = 'Benimle yemeğe çıkar mısın?';

  useEffect(() => {
    if (typedChars >= line1.length + line2.length) return;

    const timer = window.setTimeout(() => {
      setTypedChars(prev => prev + 1);
    }, 42 + Math.random() * 42);

    return () => window.clearTimeout(timer);
  }, [line1.length, line2.length, typedChars]);

  const showLine1 = line1.substring(0, Math.min(typedChars, line1.length));
  const showLine2 = typedChars > line1.length ? line2.substring(0, typedChars - line1.length) : '';
  const isTypingLine1 = typedChars <= line1.length;
  const isTypingLine2 = typedChars > line1.length;

  // Hayır butonu kaçar ama küçülmez / kaybolmaz: her zaman tam boyutta ve
  // ekran içinde kalacak şekilde rastgele bir noktaya zıplar.
  const moveNoButton = () => {
    if (!buttonRef.current) return;

    if (!isMoved) {
      setIsMoved(true);
    }

    const btnWidth = buttonRef.current.offsetWidth;
    const btnHeight = buttonRef.current.offsetHeight;
    const padding = 24;
    const maxX = Math.max(padding, window.innerWidth - btnWidth - padding);
    const maxY = Math.max(padding, window.innerHeight - btnHeight - padding);
    const randomX = padding + Math.random() * Math.max(1, maxX - padding);
    const randomY = padding + Math.random() * Math.max(1, maxY - padding);

    setNoPosition({ x: randomX, y: randomY });
  };

  const handleYesClick = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4ade80', '#d4af37', '#ffffff'],
    });

    setIsApproving(true);
    window.setTimeout(onYes, 1800);
  };

  if (isApproving) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0c] font-mono shadow-[0_30px_90px_rgba(0,0,0,0.6)]"
      >
        {TITLE_BAR}
        <div className="space-y-1.5 p-6 text-[13px] leading-relaxed sm:text-sm">
          <p className="text-white/55">
            <span className="text-[#28c840]">➜</span> <span className="text-[#7dd3fc]">~/randevu</span>{' '}
            <span className="text-white/80">./teklif.sh --cevap=evet</span>
          </p>
          <p className="text-green-400">✓ teklif kabul edildi</p>
          <p className="text-green-400">
            ✓ kalp bağlantısı kuruldu <span className="text-white/35">❤️</span>
          </p>
          <p className="text-green-400">✓ randevu modülü yükleniyor...</p>
          <motion.p
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="mt-2 text-white"
          >
            yönlendiriliyor_
          </motion.p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0c] font-mono shadow-[0_30px_90px_rgba(0,0,0,0.6)]"
    >
      {TITLE_BAR}

      <div className="relative px-6 py-7 sm:px-8 sm:py-9">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.10),transparent_38%)]" />

        <div className="relative">
          <p className="text-white/55">
            <span className="text-[#28c840]">➜</span> <span className="text-[#7dd3fc]">~/randevu</span>{' '}
            <span className="text-white/80">./teklif.sh</span>
          </p>

          <motion.div
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ repeat: Infinity, duration: 2.2 }}
            className="my-6 flex justify-center text-[#d4af37] drop-shadow-[0_0_18px_rgba(212,175,55,0.25)]"
          >
            <Heart size={44} fill="currentColor" />
          </motion.div>

          <p className="break-words text-center text-[clamp(0.95rem,3vw,1.3rem)] leading-tight text-green-400 drop-shadow-[0_0_14px_rgba(74,222,128,0.16)]">
            {showLine1}
            {isTypingLine1 && (
              <motion.span
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{ repeat: Infinity, duration: 1, times: [0, 0.5, 0.51, 1] }}
                className="ml-1 inline-block h-5 w-2.5 align-middle bg-green-400"
              />
            )}
          </p>

          <h1 className="mx-auto mt-3 max-w-[520px] break-words text-center font-serif text-[clamp(1.9rem,5vw,3.4rem)] italic leading-[1.02] tracking-[-0.02em] text-[#d4af37] drop-shadow-[0_0_22px_rgba(212,175,55,0.16)]">
            {showLine2}
            {isTypingLine2 && (
              <motion.span
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{ repeat: Infinity, duration: 1, times: [0, 0.5, 0.51, 1] }}
                className="ml-2 inline-block h-7 w-3 align-middle bg-[#d4af37] md:h-9"
              />
            )}
          </h1>

          <p className="mt-5 text-center text-xs text-white/30">
            <span className="text-white/25">{'//'}</span> ipucu: doğru cevap yeşil olan 😉
          </p>

          <div className="mt-2 flex min-h-12 items-center justify-center">
            <AnimatePresence>
              {isMoved && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="max-w-md text-center text-xs leading-relaxed text-yellow-400/90"
                >
                  <span className="font-bold text-[#ff5f57]">WARNING:</span> 'Hayır' segmentasyon hatası verdi. Lütfen 'Evet' ile devam edin.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-4 flex h-14 items-center justify-center gap-5">
            <button
              onClick={handleYesClick}
              className="relative z-10 inline-flex min-w-[120px] items-center justify-center rounded-lg bg-green-400 px-9 py-3 text-sm font-bold tracking-wide text-black shadow-[0_10px_30px_rgba(74,222,128,0.18)] transition-all hover:-translate-y-0.5 hover:bg-green-300 active:scale-95"
            >
              Evet
            </button>

            <div className="relative" ref={wrapperRef}>
              <motion.button
                ref={buttonRef}
                animate={isMoved ? { top: noPosition.y, left: noPosition.x } : { top: 0, left: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onHoverStart={moveNoButton}
                onTouchStart={event => {
                  event.preventDefault();
                  moveNoButton();
                }}
                onClick={event => {
                  event.preventDefault();
                  moveNoButton();
                }}
                className={cn(
                  'rounded-lg border border-white/15 px-7 py-3 text-xs font-semibold tracking-widest text-white/55 transition-colors hover:border-white/25 hover:text-white/75',
                  isMoved ? 'fixed z-[100]' : 'absolute',
                )}
                style={{ margin: 0, pointerEvents: 'auto', transformOrigin: 'center' }}
              >
                Hayır
              </motion.button>

              <div className="pointer-events-none px-7 py-3 text-xs opacity-0">Hayır</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
