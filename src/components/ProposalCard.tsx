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
    }, 45 + Math.random() * 45);

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card flex w-full max-w-[min(92vw,640px)] flex-col items-center justify-center rounded-3xl p-6 text-center sm:p-10 md:p-12"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mb-6 text-[#d4af37]"
      >
        <Heart size={48} fill="currentColor" />
      </motion.div>

      <div className="mb-8 flex min-h-[240px] w-full flex-col items-center justify-center gap-4 sm:min-h-[300px]">
        <p className="w-full px-2 font-serif text-base font-semibold leading-snug text-white sm:text-xl md:text-2xl">
          {staticLine}
        </p>

        <p className="w-full break-words px-2 font-mono text-[clamp(1.15rem,4vw,1.9rem)] leading-tight text-green-400">
          {showLine1}
          {isTypingLine1 && (
            <motion.span
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ repeat: Infinity, duration: 1, times: [0, 0.5, 0.51, 1] }}
              className="ml-1 inline-block h-6 w-3 align-middle bg-green-400 md:h-8"
            />
          )}
        </p>

        <h1 className="w-full max-w-full break-words px-2 font-serif text-[clamp(2.4rem,6vw,4.6rem)] italic leading-[0.95] text-[#d4af37]">
          {showLine2}
          {isTypingLine2 && (
            <motion.span
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ repeat: Infinity, duration: 1, times: [0, 0.5, 0.51, 1] }}
              className="ml-2 inline-block h-8 w-4 align-middle bg-[#d4af37] md:h-12"
            />
          )}
        </h1>
      </div>

      <div className="mb-8 flex h-16 w-full items-center justify-center">
        <AnimatePresence>
          {isMoved && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center font-mono text-sm tracking-wide text-yellow-400/90 md:text-base"
            >
              <span className="font-bold text-red-400">WARNING:</span> 'Hayır' seçeneği güvenlik duvarına takıldı. Lütfen 'Evet' ile devam edin.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="relative flex h-16 w-full items-center justify-center gap-6">
        <button
          onClick={handleYesClick}
          className="btn-glow relative z-10 rounded-full bg-[#d4af37] px-12 py-4 font-semibold tracking-wider text-black shadow-lg transition-all hover:scale-105 active:scale-95"
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
              'rounded-full border border-[#d4af37] px-8 py-4 text-xs tracking-widest text-white/80 transition-colors',
              isMoved ? 'fixed z-[100]' : 'absolute',
            )}
            style={{ margin: 0, pointerEvents: 'auto', transformOrigin: 'center' }}
          >
            Hayır
          </motion.button>

          <div className="pointer-events-none px-8 py-4 opacity-0">Hayır</div>
        </div>
      </div>
    </motion.div>
  );
}
