import {
  getModelForClass,
  prop,
  defaultClasses,
  modelOptions,
} from '@typegoose/typegoose';

import { User, UserType } from '../../types/index.js';

import { createHash } from '../../helpers/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  },
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: false, default: '' })
  public avatar?: string;

  @prop({ required: true, default: '' })
  public firstName: string;

  @prop({ required: true, default: '' })
  public lastName: string;

  @prop({ required: true, default: '' })
  private password?: string;

  constructor(userData: User) {
    super();
    this.firstName = userData.firstName;
    this.lastName = userData.lastName;
    this.email = userData.email;
    this.avatar = userData.avatar;
  }

  @prop()
  public type: UserType;

  public getPassword() {
    return this.password;
  }

  public setPassword(password: string, salt: string) {
    this.password = createHash(password, salt);
  }
}

export const UserModel = getModelForClass(UserEntity);
