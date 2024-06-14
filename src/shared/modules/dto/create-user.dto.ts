import {
  IsEmail,
  IsString,
  IsEnum,
  MaxLength,
  MinLength,
} from 'class-validator';

import { UserType } from '../../types/user.type.js';
import { CreateUserMessages } from './create-user.messages.js';

export class CreateUserDto {
  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
  public email: string;

  @IsString({ message: CreateUserMessages.avatar.invalidFormat })
  public avatar?: string;

  @IsString({ message: CreateUserMessages.firstName.invalidFormat })
  @MinLength(1, { message: CreateUserMessages.firstName.minLength })
  @MaxLength(15, { message: CreateUserMessages.firstName.maxLength })
  public firstName: string;

  @IsString({ message: CreateUserMessages.lastName.invalidFormat })
  @MinLength(1, { message: CreateUserMessages.lastName.minLength })
  @MaxLength(15, { message: CreateUserMessages.lastName.maxLength })
  public lastName: string;

  @IsString({ message: CreateUserMessages.password.invalidFormat })
  public password: string;

  @IsEnum(UserType, { message: CreateUserMessages.type.invalid })
  public type: UserType;
}
