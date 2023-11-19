import { UserModel } from '../repositories/models/user.model';
import { RegistrationDto } from './registration.dto';
import bcrypt from 'bcrypt';

type TCreateUser = Pick<UserModel, 'email' | 'passwordHash'>;

export class CreateUserDto implements TCreateUser {
  email: string;
  passwordHash: string;

  static async create(data: RegistrationDto) {
    const result = Object.assign(new CreateUserDto(), data);
    result.passwordHash = await bcrypt.hash(data.password, 10);

    return result;
  }
}
