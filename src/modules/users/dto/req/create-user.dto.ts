import { Transform, Type } from 'class-transformer';
import {
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
} from 'class-validator';
import { TransformHelper } from 'src/common/helpers/transform.helper';

export class CreateUserDto {
  @IsString()
  @Length(2, 20)
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  public readonly name: string;

  @Transform(TransformHelper.trim)
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
  @Type(() => Number)
  public readonly age?: number;

  @Transform(TransformHelper.trim)
  @IsString()
  @ValidateIf((obj) => obj.age === 35)
  @IsOptional()
  public readonly phone?: string;
}
