import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Oleksandr Stetsiuk',
    description: 'User name',
    required: true,
  })
  public readonly name: string;

  @ApiProperty({
    example: 'test@example.com',
    description: 'User email',
    required: true,
  })
  public readonly email: string;

  @ApiProperty({
    example: 'password1234',
    description: 'User password. At least 8 chars long',
    required: true,
  })
  public readonly password: string;

  @ApiProperty({
    example: 40,
    description: 'User age',
    required: false,
  })
  public readonly age?: number;

  @ApiProperty({
    example: '+380689373370',
    description: 'User phone',
    required: false,
  })
  public readonly phone?: string;
}
