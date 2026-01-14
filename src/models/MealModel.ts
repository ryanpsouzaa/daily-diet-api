import { BaseModel } from './BaseModel';
import { type Meal } from '../@types/meals/Meal';

class MealModel extends BaseModel<Meal> {
  constructor() {
    super('meals');
  }
}

const mealModel = new MealModel();
export default mealModel;
