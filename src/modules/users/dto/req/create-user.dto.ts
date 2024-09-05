import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotIn,
  IsOptional,
  IsString,
  Length,
  ValidateIf,
} from 'class-validator';
import { TransformHelper } from 'src/common/helpers/transform.helper';
import { AgeValid } from '../../decorators/age-valid.decorator';

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

  @AgeValid()
  public readonly age?: number;

  @Transform(TransformHelper.trim)
  @IsString()
  @ValidateIf((obj) => obj.age === 35)
  @IsOptional()
  public readonly phone?: string;
}
