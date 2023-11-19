import { RegistrationDto } from '../dto/registration.dto';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseUseCase } from '../../../common/shared/classes/base.use-case';
import { AuthQueryRepository } from '../repositories/auth.query-repository';
import { AuthRepository } from '../repositories/auth.repositories';
import { BadRequestException } from '@nestjs/common';
import { UserModel } from '../repositories/models/user.model';
import { CreateUserDto } from '../dto/create-user.dto';

export class RegistrationCommand {
  constructor(public readonly dto: RegistrationDto) {}
}

@CommandHandler(RegistrationCommand)
export class RegistrationCommandHandler
  extends BaseUseCase<RegistrationCommand, void>
  implements ICommandHandler<RegistrationCommand>
{
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly authQueryRepository: AuthQueryRepository,
  ) {
    super();
  }

  async executeUseCase({ dto }: RegistrationCommand): Promise<void> {
    const isExists = await this.authQueryRepository.emailExists(dto.email);
    if (isExists) throw new BadRequestException();

    const newUser = await CreateUserDto.create(dto);
    return this.authRepository.createUser(newUser);
  }
}
