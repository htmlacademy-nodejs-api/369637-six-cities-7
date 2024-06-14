import type { User } from './user.type.js';

export enum City {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export enum OfferType {
  apartment = 'apartment',
  house = 'house',
  room = 'room',
  hotel = 'hotel',
}

export enum Facilitie {
  Breakfast = 'Breakfast',
  AirConditioning = 'Air conditioning',
  LaptopFriendlyWorkspace = 'Laptop friendly workspace',
  BabySeat = 'Baby seat',
  Washer = 'Washer',
  Towels = 'Towels',
  Fridge = 'Fridge',
}

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
  userId: User;
  /**
   * Количество комментариев
   */
  comments?: number;
  /**
   * Координаты предложения для аренды
   */
  latitude: string;
  longitude: string;
};
