import { Logger } from '@nestjs/common';
import { UseCaseException } from '../../exeptions/use-case.exception';

export abstract class BaseUseCase<TCommand, TResult> {
  private readonly logger = new Logger(BaseUseCase.name);

  async execute(command: TCommand): Promise<TResult> {
    try {
      return await this.executeUseCase(command);
    } catch (e) {
      console.log(e);
      const error = JSON.stringify(e);
      this.logger.error(error);
      throw new UseCaseException(e);
    }
  }

  abstract executeUseCase(command: TCommand): Promise<TResult>;
}
