import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsInt,
  IsNotIn,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

class CreateCarDto {
  @IsString()
  @Length(2, 20)
  public readonly model: string;

  @IsString()
  @Length(2, 20)
  public readonly producer: string;
}

export class CreateUserDto {
  @IsString()
  @Length(2, 20)
  public readonly name: string;

  @IsString()
  @IsEmail()
  public readonly email: string;

  @IsNotIn(['password', '123', 'qwe'])
  @IsString()
  // @Matches(/^.$/, { message: 'Incorrect password' })
  public readonly password: string;

  @IsInt()
  @IsNumber()
  @Min(15)
  @Max(150)
  @IsOptional()
  public readonly age?: number;

  @IsString()
  @ValidateIf((obj) => obj.age === 35)
  @IsOptional()
  public readonly phone?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateCarDto)
  @IsArray()
  public readonly cars: CreateCarDto[];
}
