import { HttpException, HttpStatus } from '@nestjs/common';

export class UseCaseException extends HttpException {
  constructor(msg: any) {
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = msg;
    if (msg.status) {
      statusCode = msg.status;
      message = msg.response.message;
    }
    super(message, statusCode);
  }
}
