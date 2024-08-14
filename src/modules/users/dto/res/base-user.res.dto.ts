import { ApiProperty } from '@nestjs/swagger';

export class BaseUserResDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

  name: string;

  email: string;

  age: number;

  password: string;

  phone: string;

  createdAt: Date;

  updatedAt: Date;
}
