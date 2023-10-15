import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ERRORS } from 'src/common/utils';

export class CreateUserDto {
  @IsEmail({}, { message: ERRORS.EMAIL_IS_INVALIDATE.message })
  @IsNotEmpty({ message: ERRORS.EMAIL_IS_EMPTY.message })
  email: string;

  @IsNotEmpty({ message: ERRORS.NICKNAME_IS_EMPTY.message })
  nickname: string;

  @MinLength(6, { message: ERRORS.PASSWORD_TOO_SHORT.message })
  @IsNotEmpty({ message: ERRORS.PASSWORD_IS_EMPTY.message })
  password: string;
}
