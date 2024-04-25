import type { User } from './user.type.js';

export type City =
  | 'Paris'
  | 'Cologne'
  | 'Brussels'
  | 'Amsterdam'
  | 'Hamburg'
  | 'Dusseldorf';

export type OfferType = 'apartment' | 'house' | 'room' | 'hotel';

export type Facilitie =
  | 'Breakfast'
  | 'Air conditioning'
  | 'Laptop friendly workspace'
  | 'Baby seat'
  | 'Washer'
  | 'Towels'
  | 'Fridge';

export type Offer = {
  /**
   * Наименование
   */
  name: string;
  /**
   * Описание предложения
   */
  description: string;
  /**
   * Дата публикации
   */
  date: Date;
  /**
   * Город
   */
  city: City;
  /**
   * Превью изображения
   */
  preview: string;
  /**
   * Фотографии жилья
   */
  photos: string[];
  /**
   * Признак премиальности предложения
   */
  isPremium: boolean;
  /**
   * Признак того, что предложение принадлежит списку избранных предложений пользователя
   */
  isFavorite: boolean;
  /**
   * Рейтинг
   */
  rating: number;
  /**
   * Тип жилья
   */
  type: OfferType;
  /**
   * Количество комнат
   */
  roomsCount: number;
  /**
   * Количество гостей
   */
  guestsCount: number;
  /**
   * Стоимость аренды
   */
  price: number;
  /**
   * Удобства
   */
  facilities: Facilitie[];
  /**
   * Автор предложения
   */
  author: User;
  /**
   * Количество комментариев
   */
  comments?: number;
  /**
   * Координаты предложения для аренды
   */
  latitude: number;
  longitude: number;
};
