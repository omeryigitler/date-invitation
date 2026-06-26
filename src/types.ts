export type Step = 'proposal' | 'date' | 'time' | 'meal' | 'exactTime' | 'food' | 'confirmation';
export type MealTime = 'Sabah' | 'Öğle' | 'Akşam';

export interface DateDetails {
  date?: Date | null;
  dateTime: Date | null;
  mealTime: MealTime | null;
  food: string | null;
}
