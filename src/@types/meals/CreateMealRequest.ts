export interface CreateMealRequest {
  name: string;
  userId: string;
  description: string;
  dietDateTime?: Date;
  isOnDiet: boolean;
}
