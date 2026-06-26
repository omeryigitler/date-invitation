import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Terminal } from 'lucide-react';
import { cn } from '../lib/utils';

interface ProposalCardProps {
  onYes: () => void;
}

export default function ProposalCard({ onYes }: ProposalCardProps) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [isMoved, setIsMoved] = useState(false);
  const [noScale, setNoScale] = useState(1);
  const [isApproving, setIsApproving] = useState(false);
  const [typedChars, setTypedChars] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const staticLine = 'Sisteme yeni bir görev atandı:';
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

  const moveNoButton = () => {
    if (!wrapperRef.current || !buttonRef.current) return;

    if (!isMoved) {
      setIsMoved(true);
    }

    const btnWidth = buttonRef.current.offsetWidth * noScale;
    const btnHeight = buttonRef.current.offsetHeight * noScale;
    const padding = 20;
    const maxX = Math.max(padding, window.innerWidth - btnWidth - padding);
    const maxY = Math.max(padding, window.innerHeight - btnHeight - padding);
    const randomX = padding + Math.random() * Math.max(1, maxX - padding);
    const randomY = padding + Math.random() * Math.max(1, maxY - padding);

    setNoPosition({ x: randomX, y: randomY });
    setNoScale(prev => Math.max(0.2, prev - 0.15));
  };

  const handleYesClick = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#d4af37', '#ffffff', '#c93a2f'],
    });

    setIsApproving(true);
    window.setTimeout(onYes, 1800);
  };

  if (isApproving) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="glass-card w-full max-w-lg rounded-3xl border border-[#d4af37]/30 bg-[#0a0a0c] p-8 sm:p-12"
      >
        <Terminal className="mx-auto mb-6 animate-pulse text-[#d4af37]" size={48} />
        <div className="space-y-2 text-left font-mono text-sm text-green-400 md:text-base">
          <p>{'>'} Sistem onaylandı...</p>
          <p>{'>'} Güvenlik duvarı aşıldı...</p>
          <p>{'>'} Randevu modülü yükleniyor...</p>
          <motion.p
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="mt-4 text-white"
          >
            Yönlendiriliyor_
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
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card relative flex w-full max-w-[min(92vw,640px)] flex-col items-center justify-center overflow-hidden rounded-3xl px-6 py-8 text-center shadow-[0_24px_90px_rgba(0,0,0,0.42)] sm:px-10 sm:py-11 md:px-12 md:py-12"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.11),transparent_34%),radial-gradient(circle_at_18%_92%,rgba(201,58,47,0.08),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent" />

      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 2.2 }}
        className="relative mb-7 text-[#d4af37] drop-shadow-[0_0_18px_rgba(212,175,55,0.18)]"
      >
        <Heart size={46} fill="currentColor" />
      </motion.div>

      <div className="relative mb-9 flex w-full flex-col items-center justify-center gap-3.5 sm:mb-10 sm:gap-4">
        <p className="w-full px-2 font-serif text-[1.05rem] font-semibold leading-snug text-white/95 sm:text-xl md:text-[1.35rem]">
          {staticLine}
        </p>

        <p className="w-full break-words px-2 font-mono text-[clamp(1.05rem,3.3vw,1.55rem)] leading-tight text-green-400 drop-shadow-[0_0_14px_rgba(74,222,128,0.16)]">
          {showLine1}
          {isTypingLine1 && (
            <motion.span
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ repeat: Infinity, duration: 1, times: [0, 0.5, 0.51, 1] }}
              className="ml-1 inline-block h-5 w-2.5 align-middle bg-green-400 md:h-7"
            />
          )}
        </p>

        <h1 className="mx-auto w-full max-w-[560px] break-words px-2 font-serif text-[clamp(2.15rem,5.15vw,4.05rem)] italic leading-[0.98] tracking-[-0.035em] text-[#d4af37] drop-shadow-[0_0_22px_rgba(212,175,55,0.13)]">
          {showLine2}
          {isTypingLine2 && (
            <motion.span
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ repeat: Infinity, duration: 1, times: [0, 0.5, 0.51, 1] }}
              className="ml-2 inline-block h-7 w-3.5 align-middle bg-[#d4af37] md:h-10"
            />
          )}
        </h1>
      </div>

      <div className="relative mb-5 flex min-h-12 w-full items-center justify-center px-2 sm:mb-6">
        <AnimatePresence>
          {isMoved && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-md text-center font-mono text-xs leading-relaxed tracking-wide text-yellow-400/90 sm:text-sm"
            >
              <span className="font-bold text-red-400">WARNING:</span> 'Hayır' seçeneği güvenlik duvarına takıldı. Lütfen 'Evet' ile devam edin.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="relative flex h-14 w-full items-center justify-center gap-5 sm:gap-6">
        <button
          onClick={handleYesClick}
          className="btn-glow relative z-10 min-w-[132px] rounded-full bg-[#d4af37] px-10 py-3.5 font-semibold tracking-wide text-black shadow-[0_12px_30px_rgba(212,175,55,0.18)] transition-all hover:scale-105 active:scale-95 sm:px-12"
        >
          Evet
        </button>

        <div className="relative" ref={wrapperRef}>
          <motion.button
            ref={buttonRef}
            animate={isMoved ? { top: noPosition.y, left: noPosition.x, scale: noScale } : { top: 0, left: 0, scale: 1 }}
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
              'rounded-full border border-[#d4af37]/80 px-7 py-3.5 text-xs font-semibold tracking-widest text-white/70 transition-colors hover:bg-white/[0.03] hover:text-white/90',
              isMoved ? 'fixed z-[100]' : 'absolute',
            )}
            style={{ margin: 0, pointerEvents: 'auto', transformOrigin: 'center' }}
          >
            Hayır
          </motion.button>

          <div className="pointer-events-none px-7 py-3.5 opacity-0">Hayır</div>
        </div>
      </div>
    </motion.div>
  );
}
