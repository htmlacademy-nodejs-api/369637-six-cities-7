export type UserType = 'обычный' | 'pro';

export type User = {
  /**
   * Имя
   */
  firstName: string;
  /**
   * Фамилия
   */
  lastName: string;
  /**
   * Электронная почта
   */
  email: string;
  /**
   * Аватар пользователя
   */
  avatar?: string;

  /**
   * Тип пользователя
   */
  type: UserType;
};
