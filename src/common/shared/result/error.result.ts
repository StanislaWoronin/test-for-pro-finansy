import { ApiProperty } from '@nestjs/swagger';

export class ErrorResult {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  path: string;

  @ApiProperty()
  message: string | string[];

  @ApiProperty()
  timestamp: string;
}
