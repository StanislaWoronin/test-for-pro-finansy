import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './models/user.model';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateSessionDto } from '../dto/create-session.dto';
import { SessionModel } from './models/session.model';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(UserModel) private readonly userRepository: typeof UserModel,
    @InjectModel(SessionModel)
    private readonly sessionRepository: typeof SessionModel,
  ) {}

  async createUser(dto: CreateUserDto): Promise<void> {
    await this.userRepository.create(dto);
    return;
  }

  async createSession(dto: CreateSessionDto): Promise<SessionModel> {
    return this.sessionRepository.create(dto);
  }

  async deleteSession(id: string): Promise<boolean> {
    const result = await this.sessionRepository.destroy({ where: { id } });
    return result === 1;
  }
}
