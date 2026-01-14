export interface Meal {
  id: string;
  userId: string;
  name: string;
  description: string;
  dietDateTime?: Date;
  isOnDiet: boolean;
  createdAt: Date;
}
