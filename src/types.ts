export type Step = 'proposal' | 'date' | 'time' | 'food' | 'confirmation';
export type MealTime = 'Sabah' | 'Öğle' | 'Akşam';

export interface DateDetails {
  dateTime: Date | null;
  mealTime: MealTime | null;
  food: string | null;
}
