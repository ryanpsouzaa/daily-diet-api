import { BaseModel } from './BaseModel';
import { type User } from '../@types/users/User';

class UserModel extends BaseModel<User> {
  constructor() {
    super('users');
  }
}

const userModel = new UserModel();
export default userModel;
