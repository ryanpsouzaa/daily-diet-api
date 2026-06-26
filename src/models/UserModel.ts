import { BaseModel } from './BaseModel';
import { type User } from '../@types/users/User';

class UserModel extends BaseModel<User> {
  constructor() {
    super('users');
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.query.where({ email }).first();
    return user as User | undefined;
  }
}

const userModel = new UserModel();
export default userModel;
