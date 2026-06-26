import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import type { DateDetails, MealTime, Step } from './types';
import ConfirmationCard from './components/ConfirmationCard';
import DatePickerCard from './components/DatePickerCard';
import FoodPickerCard from './components/FoodPickerCard';
import ProposalCard from './components/ProposalCard';
import TimePickerCard from './components/TimePickerCard';

export default function App() {
  const [step, setStep] = useState<Step>('proposal');
  const [details, setDetails] = useState<DateDetails>({
    dateTime: null,
    mealTime: null,
    food: null,
  });

  const handleYes = () => setStep('date');

  const handleDateSelect = (dateTime: Date) => {
    setDetails(prev => ({ ...prev, dateTime }));
    setStep('time');
  };

  const handleTimeSelect = (mealTime: MealTime) => {
    setDetails(prev => ({ ...prev, mealTime }));
    setStep('food');
  };

  const handleFoodSelect = (food: string) => {
    setDetails(prev => ({ ...prev, food }));
    setStep('confirmation');
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-[#080808] p-4 text-[#e0e0e0] sm:p-6">
      <div className="relative z-10 flex min-h-[calc(100vh-2rem)] w-full items-center justify-center sm:min-h-[calc(100vh-3rem)]">
        <AnimatePresence mode="wait">
          {step === 'proposal' && <ProposalCard key="proposal" onYes={handleYes} />}

          {step === 'date' && <DatePickerCard key="date" onSelect={handleDateSelect} />}

          {step === 'time' && <TimePickerCard key="time" onSelect={handleTimeSelect} />}

          {step === 'food' && details.mealTime && (
            <FoodPickerCard key="food" time={details.mealTime} onSelect={handleFoodSelect} />
          )}

          {step === 'confirmation' && <ConfirmationCard key="confirmation" details={details} />}
        </AnimatePresence>
      </div>
    </div>
  );
}
