import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { cn } from '../lib/utils';
import type { MealTime } from '../types';

interface FoodPickerCardProps {
  time: MealTime;
  onSelect: (food: string) => void;
}

const foodOptions: Record<MealTime, { label: string; image1: string; image2: string; desc: string }[]> = {
  Sabah: [
    {
      label: 'Pancake & Kahve',
      image1: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=1200&q=80',
      image2: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=500&q=80',
      desc: 'Güne tatlı bir başlangıç. Sıcak kahve ve taptaze pancakeler.',
    },
    {
      label: 'Serpme Kahvaltı',
      image1: 'https://images.unsplash.com/photo-1533089859715-31187c4e3ee9?w=1200&q=80',
      image2: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=500&q=80',
      desc: 'Zengin çeşitleriyle geleneksel ve keyifli bir sabah ziyafeti.',
    },
    {
      label: 'Kruvasan & Çay',
      image1: 'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=1200&q=80',
      image2: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&q=80',
      desc: 'Zarif ve hafif. Taze fırından çıkmış kruvasan.',
    },
    {
      label: 'Sağlıklı Kase',
      image1: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=1200&q=80',
      image2: 'https://images.unsplash.com/photo-1494597564530-871f2b93ac55?w=500&q=80',
      desc: 'Taze meyveler ve granola ile ferahlatıcı bir başlangıç.',
    },
  ],
  Öğle: [
    {
      label: 'İtalyan (Pizza/Makarna)',
      image1: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1200&q=80',
      image2: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80',
      desc: 'Taze el yapımı makarna ve İtalyan lezzetleri.',
    },
    {
      label: 'Burger & Patates',
      image1: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&q=80',
      image2: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=500&q=80',
      desc: 'Günün yorgunluğunu alacak doyurucu ve lezzetli bir klasik.',
    },
    {
      label: 'Taze Salata',
      image1: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80',
      image2: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&q=80',
      desc: 'Hafif, sağlıklı ve renkli bir öğle yemeği.',
    },
    {
      label: 'Uzak Doğu',
      image1: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=1200&q=80',
      image2: 'https://images.unsplash.com/photo-1552611052-33e04de081de?w=500&q=80',
      desc: 'Baharatların ve lezzetin mükemmel uyumu.',
    },
  ],
  Akşam: [
    {
      label: 'Sushi & Uzak Doğu',
      image1: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1200&q=80',
      image2: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500&q=80',
      desc: 'Zarif ve farklı lezzetler arayanlar için muazzam bir seçim.',
    },
    {
      label: 'Şık Bir Et Yemeği',
      image1: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80',
      image2: 'https://images.unsplash.com/photo-1506526135688-667727145719?w=500&q=80',
      desc: 'Kırmızı şarap eşliğinde unutulmaz bir akşam yemeği.',
    },
    {
      label: 'Deniz Ürünleri',
      image1: 'https://images.unsplash.com/photo-1615141982883-c7da0e69f58f?w=1200&q=80',
      image2: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=500&q=80',
      desc: 'Taze deniz ürünleri ile hafif ve romantik bir akşam.',
    },
    {
      label: 'Romantik İtalyan',
      image1: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=1200&q=80',
      image2: 'https://images.unsplash.com/photo-1572550502159-fb93a4bc0303?w=500&q=80',
      desc: 'Mum ışığında, şık bir atmosferde eşsiz İtalyan tatları.',
    },
  ],
};

export default function FoodPickerCard({ time, onSelect }: FoodPickerCardProps) {
  const options = foodOptions[time];
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentOption = options[currentIndex];

  const handleNext = () => setCurrentIndex(prev => (prev + 1) % options.length);
  const handlePrev = () => setCurrentIndex(prev => (prev - 1 + options.length) % options.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0c] font-mono shadow-[0_30px_90px_rgba(0,0,0,0.6)]"
    >
      {/* terminal üst bar */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.03] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate text-[11px] tracking-wide text-white/40">randevu — zsh — menü</span>
      </div>

      <div className="grid min-h-[560px] lg:grid-cols-[0.95fr_1.05fr]">
        {/* sol: terminal menü */}
        <div className="relative z-10 flex flex-col p-6 sm:p-8">
          <p className="text-white/55">
            <span className="text-[#28c840]">➜</span> <span className="text-[#7dd3fc]">~/randevu</span>{' '}
            <span className="text-white/80">./menu_sec.sh --{time.toLowerCase()}</span>
          </p>

          <div className="mb-6 mt-5">
            <h2 className="font-serif text-3xl italic leading-tight text-[#d4af37] drop-shadow-[0_0_22px_rgba(212,175,55,0.16)] md:text-4xl">
              Ne yiyelim?
            </h2>
            <p className="mt-3 max-w-md text-xs leading-relaxed text-white/35">
              <span className="text-white/25">{'//'}</span> bir favori seç, sağdaki görsel seçtiğin lezzete göre değişsin
            </p>
          </div>

          <div className="mb-6 flex flex-1 flex-col gap-2.5">
            {options.map((option, index) => {
              const isActive = currentIndex === index;

              return (
                <button
                  key={option.label}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    'group rounded-lg border p-3.5 text-left transition-all duration-300',
                    isActive
                      ? 'border-green-400/50 bg-green-400/[0.07]'
                      : 'border-white/[0.08] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]',
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded border transition-all',
                        isActive ? 'border-green-400 bg-green-400 text-black' : 'border-white/15 text-white/35 group-hover:text-white/60',
                      )}
                    >
                      {isActive ? <Check size={13} /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
                    </div>
                    <div>
                      <h3 className={cn('font-serif text-lg italic leading-tight transition-colors md:text-xl', isActive ? 'text-white' : 'text-white/45 group-hover:text-white/75')}>
                        {option.label}
                      </h3>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, y: -4, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: -4, height: 0 }}
                            className="mt-1.5 overflow-hidden text-xs leading-relaxed text-white/55"
                          >
                            {option.desc}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => onSelect(currentOption.label)}
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-lg bg-green-400 px-8 py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-black transition-all hover:-translate-y-0.5 hover:bg-green-300 active:scale-95"
          >
            → seçimi onayla
            <ArrowRight size={16} />
          </button>
        </div>

        {/* sağ: görsel paneli */}
        <div className="relative z-10 min-h-[360px] overflow-hidden border-t border-white/[0.06] bg-[#070708] lg:min-h-[560px] lg:border-l lg:border-t-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentOption.label}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <img src={currentOption.image1} alt={currentOption.label} className="h-full w-full object-cover" draggable={false} referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/85" />
            </motion.div>
          </AnimatePresence>

          <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
            <div className="rounded-md border border-white/12 bg-black/55 px-3 py-1.5 text-xs text-green-300 backdrop-blur-md">
              {String(currentIndex + 1).padStart(2, '0')} / {String(options.length).padStart(2, '0')}
            </div>
            <div className="flex gap-2">
              <button onClick={handlePrev} className="flex h-10 w-10 items-center justify-center rounded-md border border-white/12 bg-black/55 text-white backdrop-blur-md transition hover:bg-white/10">
                <ArrowLeft size={17} />
              </button>
              <button onClick={handleNext} className="flex h-10 w-10 items-center justify-center rounded-md border border-white/12 bg-black/55 text-white backdrop-blur-md transition hover:bg-white/10">
                <ArrowRight size={17} />
              </button>
            </div>
          </div>

          <div className="absolute bottom-5 left-5 right-5">
            <div className="mb-4 rounded-lg border border-white/10 bg-black/55 p-4 text-white backdrop-blur-md">
              <p className="mb-1.5 text-[10px] uppercase tracking-[0.24em] text-green-400/90">seçili lezzet</p>
              <h3 className="font-serif text-2xl italic leading-tight">{currentOption.label}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-white/65">{currentOption.desc}</p>
            </div>

            <div className="flex gap-2.5 overflow-x-auto pb-1">
              {options.map((option, index) => {
                const isActive = index === currentIndex;

                return (
                  <button
                    key={option.label}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      'relative h-14 w-20 shrink-0 overflow-hidden rounded-md border transition-all',
                      isActive ? 'border-green-400 opacity-100' : 'border-white/15 opacity-55 hover:opacity-90',
                    )}
                  >
                    <img src={option.image1} alt={option.label} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/15" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
