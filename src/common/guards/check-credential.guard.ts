import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthQueryRepository } from '../../modules/auth/repositories/auth.query-repository';
import bcrypt from 'bcrypt';

@Injectable()
export class CheckCredentialGuard implements CanActivate {
  constructor(private readonly authQueryRepository: AuthQueryRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const { email, password } = req.body;

      const user = await this.authQueryRepository.findUserViaEmail(email);

      const passwordEqual = await bcrypt.compare(password, user.passwordHash);
      if (!passwordEqual) throw Error();

      req.userId = user.id;
      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
