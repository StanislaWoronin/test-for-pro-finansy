import { UserModel } from '../repositories/models/user.model';
import { ApiProperty } from '@nestjs/swagger';

type TMeView = Pick<UserModel, 'id' | 'email'>;

export class MeView implements TMeView {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  static toView(data: Partial<UserModel>) {
    return Object.assign(new MeView(), {
      id: data.id,
      email: data.email,
    });
  }
}
