import { DocumentType } from '@typegoose/typegoose';

import { UserEntity } from './user.entity.js';
import { CreateUserDto } from '../dto/create-user.dto.js';

export interface UserServiceInterface {
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(
    dto: CreateUserDto,
    salt: string
  ): Promise<DocumentType<UserEntity>>;
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
}
