import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BaseUseCase } from '../../../common/shared/classes/base.use-case';
import { MeView } from '../views/me.view';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { AuthQueryRepository } from '../repositories/auth.query-repository';
import { UserModel } from '../repositories/models/user.model';

export class GetInfoAboutMeQuery {
  constructor(public readonly userId: string) {}
}

@QueryHandler(GetInfoAboutMeQuery)
export class GetInfoAboutMeQueryHandler
  extends BaseUseCase<GetInfoAboutMeQuery, MeView>
  implements IQueryHandler<GetInfoAboutMeQuery>
{
  constructor(
    private readonly authQueryRepository: AuthQueryRepository,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {
    super();
  }

  async executeUseCase({ userId }: GetInfoAboutMeQuery): Promise<MeView> {
    let me: Partial<UserModel> = await this.cacheManager.get('me');
    if (!me) {
      me = await this.authQueryRepository.findUserViaId(userId);
      await this.cacheManager.set('me', { id: me.id, email: me.email });
    }

    return MeView.toView(me);
  }
}
