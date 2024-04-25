type UserType = 'обычный' | 'pro';

export type User = {
  /**
   * Имя
   */
  name: string;
  /**
   * Электронная почта
   */
  email: string;
  /**
   * Аватар пользователя
   */
  avatar?: string;
  /**
   * Пароль
   */
  password: string;
  /**
   * Тип пользователя
   */
  type: UserType;
};
