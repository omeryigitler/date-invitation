import { useState } from 'react';
import { motion } from 'motion/react';
import type { MealTime } from '../types';

interface FoodPickerCardProps {
  time: MealTime;
  onSelect: (food: string) => void;
}

const foodOptions: Record<MealTime, { label: string; image1: string; image2: string; desc: string }[]> = {
  Sabah: [
    {
      label: 'Pancake & Kahve',
      image1: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&q=80',
      image2: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&q=80',
      desc: 'Güne tatlı bir başlangıç. Sıcak kahve ve taptaze pancakeler.',
    },
    {
      label: 'Serpme Kahvaltı',
      image1: 'https://images.unsplash.com/photo-1533089859715-31187c4e3ee9?w=800&q=80',
      image2: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400&q=80',
      desc: 'Zengin çeşitleriyle geleneksel ve keyifli bir sabah ziyafeti.',
    },
    {
      label: 'Kruvasan & Çay',
      image1: 'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=800&q=80',
      image2: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&q=80',
      desc: 'Zarif ve hafif. Taze fırından çıkmış kruvasan.',
    },
    {
      label: 'Sağlıklı Kase',
      image1: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800&q=80',
      image2: 'https://images.unsplash.com/photo-1494597564530-871f2b93ac55?w=400&q=80',
      desc: 'Taze meyveler ve granola ile ferahlatıcı bir başlangıç.',
    },
  ],
  Öğle: [
    {
      label: 'İtalyan (Pizza/Makarna)',
      image1: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=80',
      image2: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80',
      desc: 'Taze el yapımı makarna ve İtalyan lezzetleri.',
    },
    {
      label: 'Burger & Patates',
      image1: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
      image2: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=400&q=80',
      desc: 'Günün yorgunluğunu alacak doyurucu ve lezzetli bir klasik.',
    },
    {
      label: 'Taze Salata',
      image1: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
      image2: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80',
      desc: 'Hafif, sağlıklı ve renkli bir öğle yemeği.',
    },
    {
      label: 'Uzak Doğu',
      image1: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80',
      image2: 'https://images.unsplash.com/photo-1552611052-33e04de081de?w=400&q=80',
      desc: 'Baharatların ve lezzetin mükemmel uyumu.',
    },
  ],
  Akşam: [
    {
      label: 'Sushi & Uzak Doğu',
      image1: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80',
      image2: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400&q=80',
      desc: 'Zarif ve farklı lezzetler arayanlar için muazzam bir seçim.',
    },
    {
      label: 'Şık Bir Et Yemeği',
      image1: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
      image2: 'https://images.unsplash.com/photo-1506526135688-667727145719?w=400&q=80',
      desc: 'Kırmızı şarap eşliğinde unutulmaz bir akşam yemeği.',
    },
    {
      label: 'Deniz Ürünleri',
      image1: 'https://images.unsplash.com/photo-1615141982883-c7da0e69f58f?w=800&q=80',
      image2: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=400&q=80',
      desc: 'Taze deniz ürünleri ile hafif ve romantik bir akşam.',
    },
    {
      label: 'Romantik İtalyan',
      image1: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&q=80',
      image2: 'https://images.unsplash.com/photo-1572550502159-fb93a4bc0303?w=400&q=80',
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex min-h-[550px] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/5 bg-[#1c1c24] shadow-2xl md:flex-row"
    >
      <div className="relative z-20 flex w-full flex-col justify-center p-8 md:w-1/2 md:p-12">
        <h2 className="mb-8 font-serif text-4xl italic text-[#ff7b7b] md:text-5xl">{time} Menüsü</h2>

        <div className="mb-10 flex flex-1 flex-col justify-center space-y-5">
          {options.map((option, index) => {
            const isActive = currentIndex === index;

            return (
              <button key={option.label} onClick={() => setCurrentIndex(index)} className="block w-full text-left outline-none transition-all duration-300 group">
                <h3 className={`font-serif text-xl transition-colors md:text-2xl ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}>
                  {option.label}
                </h3>
                {isActive && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-2 text-sm leading-relaxed text-white/60">
                    {option.desc}
                  </motion.p>
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onSelect(currentOption.label)}
          className="rounded-md bg-gradient-to-r from-[#ff7b7b] to-[#ff526c] px-8 py-3 text-sm font-medium uppercase tracking-wider text-white shadow-lg shadow-[#ff526c]/20 transition-all hover:-translate-y-0.5 hover:shadow-[#ff526c]/40 active:scale-95"
        >
          Seçimi Onayla
        </button>
      </div>

      <div className="relative z-10 flex min-h-[400px] w-full items-center justify-center overflow-hidden bg-[#13131a] md:min-h-[550px] md:w-1/2">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#ff7b7b]/5 to-transparent" />

        <div className="relative flex h-full w-full items-center justify-center">
          {options.map((option, index) => {
            let offset = (index - currentIndex) % options.length;
            if (offset < 0) offset += options.length;

            let x = 60;
            let scale = 0.8;
            let opacity = 0;
            let zIndex = 0;

            if (offset === 0) {
              x = 0;
              scale = 1;
              opacity = 1;
              zIndex = 30;
            } else if (offset === 1) {
              x = 60;
              scale = 0.85;
              opacity = 0.5;
              zIndex = 20;
            } else if (offset === options.length - 1) {
              x = -60;
              scale = 0.85;
              opacity = 0;
              zIndex = 10;
            }

            return (
              <motion.div
                key={option.label}
                initial={false}
                animate={{ x, scale, opacity, zIndex }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                className="absolute inset-0 flex items-center justify-center"
                style={{ pointerEvents: offset === 0 || offset === 1 ? 'auto' : 'none' }}
              >
                <motion.div
                  className={`relative h-full w-full ${offset === 0 ? 'cursor-grab active:cursor-grabbing' : offset === 1 ? 'cursor-pointer' : ''}`}
                  onClick={() => {
                    if (offset === 1) handleNext();
                    else if (offset === options.length - 1) handlePrev();
                  }}
                  drag={offset === 0 ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, { offset: dragOffset, velocity }) => {
                    if (dragOffset.x < -50 || velocity.x < -500) handleNext();
                    else if (dragOffset.x > 50 || velocity.x > 500) handlePrev();
                  }}
                >
                  <img
                    src={option.image1}
                    alt={option.label}
                    className="pointer-events-none absolute right-4 top-1/2 h-48 w-48 -translate-y-1/2 select-none rounded-[2rem] border border-white/5 object-cover shadow-2xl md:right-10 md:h-[260px] md:w-[260px]"
                    draggable={false}
                    referrerPolicy="no-referrer"
                  />

                  <img
                    src={option.image2}
                    alt={`${option.label} detail`}
                    className="pointer-events-none absolute left-8 top-1/2 h-56 w-28 -translate-y-1/2 select-none rounded-[1.5rem] border-[6px] border-[#13131a] object-cover shadow-2xl md:h-[300px] md:w-[150px]"
                    draggable={false}
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
