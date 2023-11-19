import { Injectable } from '@nestjs/common';
import { UserModel } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { SessionModel } from './models/session.model';
import { WithId } from '../../../common/shared/types/with-id';
import { TMetadata } from '../../../common/shared/types/metadata.type';

@Injectable()
export class AuthQueryRepository {
  constructor(
    @InjectModel(SessionModel)
    private readonly sessionRepository: typeof SessionModel,
    @InjectModel(UserModel) private readonly userRepository: typeof UserModel,
  ) {}

  async emailExists(email: string): Promise<boolean> {
    const isExists = await this.userRepository.findOne({ where: { email } });

    return !!isExists;
  }

  async findUserViaId(id: string): Promise<UserModel> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findUserViaEmail(email: string): Promise<UserModel> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findSessionForLogin({
    id,
    browser,
  }: WithId<TMetadata>): Promise<string | null> {
    const session = await this.sessionRepository.findOne({
      where: { userId: id, browser },
    });

    return session?.id;
  }

  async findSession(
    userId: string,
    createdAt: number,
  ): Promise<Partial<SessionModel>> {
    const session = await this.sessionRepository.findOne({
      where: { userId, createdAt },
    });

    return session.dataValues;
  }
}
