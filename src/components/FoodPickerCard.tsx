import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';
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
      className="glass-card relative grid min-h-[620px] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/5 bg-[#14141b] shadow-2xl lg:grid-cols-[0.9fr_1.1fr]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,123,123,0.1),transparent_30%),radial-gradient(circle_at_100%_100%,rgba(212,175,55,0.08),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#ff7b7b]/45 to-transparent" />

      <div className="relative z-10 flex flex-col p-7 sm:p-9 lg:p-12">
        <div className="mb-9">
          <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#ff7b7b]/80">
            <Sparkles size={15} />
            {time} menüsü
          </p>
          <h2 className="font-serif text-4xl italic leading-tight text-white md:text-5xl">
            Ne yiyelim?
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/55">
            Menüden bir favori seç. Sağdaki görsel seçtiğin lezzete göre değişecek.
          </p>
        </div>

        <div className="mb-8 flex flex-1 flex-col gap-3">
          {options.map((option, index) => {
            const isActive = currentIndex === index;

            return (
              <button
                key={option.label}
                onClick={() => setCurrentIndex(index)}
                className={`group rounded-2xl border p-4 text-left transition-all duration-300 ${
                  isActive
                    ? 'border-[#ff7b7b]/55 bg-white/[0.07] shadow-[0_0_26px_rgba(255,123,123,0.12)]'
                    : 'border-white/8 bg-white/[0.025] hover:border-white/18 hover:bg-white/[0.05]'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all ${isActive ? 'border-[#ff7b7b] bg-[#ff7b7b] text-white' : 'border-white/15 text-white/35 group-hover:text-white/70'}`}>
                    {isActive ? <Check size={15} /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
                  </div>
                  <div>
                    <h3 className={`font-serif text-xl italic leading-tight transition-colors md:text-2xl ${isActive ? 'text-white' : 'text-white/45 group-hover:text-white/75'}`}>
                      {option.label}
                    </h3>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, y: -4, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: 'auto' }}
                          exit={{ opacity: 0, y: -4, height: 0 }}
                          className="mt-2 overflow-hidden text-sm leading-relaxed text-white/62"
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
          className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#ff7b7b] to-[#ff526c] px-8 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-[#ff526c]/20 transition-all hover:-translate-y-0.5 hover:shadow-[#ff526c]/40 active:scale-95"
        >
          Seçimi Onayla
          <ArrowRight size={17} />
        </button>
      </div>

      <div className="relative z-10 min-h-[420px] overflow-hidden bg-[#0f0f15] lg:min-h-[620px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentOption.label}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <img
              src={currentOption.image1}
              alt={currentOption.label}
              className="h-full w-full object-cover"
              draggable={false}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/8 via-black/18 to-black/82" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute left-6 right-6 top-6 flex items-center justify-between">
          <div className="rounded-full border border-white/12 bg-black/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/75 backdrop-blur-md">
            {String(currentIndex + 1).padStart(2, '0')} / {String(options.length).padStart(2, '0')}
          </div>
          <div className="flex gap-2">
            <button onClick={handlePrev} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-black/45 text-white backdrop-blur-md transition hover:bg-white/10">
              <ArrowLeft size={18} />
            </button>
            <button onClick={handleNext} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-black/45 text-white backdrop-blur-md transition hover:bg-white/10">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="mb-5 max-w-md rounded-[1.5rem] border border-white/10 bg-black/45 p-5 text-white shadow-2xl backdrop-blur-md">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#ff7b7b]/90">Seçili lezzet</p>
            <h3 className="font-serif text-3xl italic leading-tight">{currentOption.label}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/68">{currentOption.desc}</p>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-1">
            {options.map((option, index) => {
              const isActive = index === currentIndex;

              return (
                <button
                  key={option.label}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-2xl border transition-all ${
                    isActive ? 'border-[#ff7b7b] opacity-100 shadow-[0_0_18px_rgba(255,123,123,0.25)]' : 'border-white/15 opacity-55 hover:opacity-90'
                  }`}
                >
                  <img src={option.image1} alt={option.label} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/15" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
