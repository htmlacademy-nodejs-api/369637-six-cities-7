import type { User } from './user.type.js';

export type Comment = {
  /**
   * Текст комментария
   */
  text: string;
  /**
   * Дата публикации комментария
   */
  date: Date;
  /**
   * Рейтинг
   */
  rating: number;
  /**
   * Автор комментария
   */
  author: User;
};
