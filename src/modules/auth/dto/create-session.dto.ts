import { SessionModel } from '../repositories/models/session.model';
import { TMetadata } from '../../../common/shared/types/metadata.type';
import { WithId } from '../../../common/shared/types/with-id';

type TCreateSession = Pick<SessionModel, 'browser' | 'userId' | 'createdAt'>;

export class CreateSessionDto implements TCreateSession {
  browser: string;
  userId: string;
  createdAt: number;

  static create(data: WithId<TMetadata>, createdAt: number) {
    return Object.assign(new CreateSessionDto(), {
      browser: data.browser,
      userId: data.id,
      createdAt,
    });
  }
}
