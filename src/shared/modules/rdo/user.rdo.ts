import { Expose } from 'class-transformer';

export class UserRdo {
  @Expose()
  public email: string;

  @Expose()
  public avatar: string;

  @Expose()
  public firstName: string;

  @Expose()
  public lastName: string;
}
