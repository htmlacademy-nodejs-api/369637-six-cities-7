import dayjs from 'dayjs';

import {
  generateRandomValue,
  getRandomItem,
  getRandomItems,
} from '../helpers/common.js';

import type { OfferGeneretorInterface } from './offer-generetor.interface.js';
import type { MockServerData } from '../types/mock-server-data.type.js';

enum Limit {
  MIN_PRICE = 100,
  MAX_PRICE = 100000,
  LAST_WEEK_DAY = 7,
  START = 1,
  MAX_ROOMS = 8,
  MAX_GUESTS = 10,
  MAX_RATING = 5,
  ROUND_LIMIT = 2,
}

const BOLEANS = ['true', 'false'];

export class OfferGenerator implements OfferGeneretorInterface {
  constructor(private readonly mockData: MockServerData) {}
  public generate(): string {
    const name = getRandomItem(this.mockData.names);
    const description = getRandomItems(this.mockData.descriptions);
    const createdDate = dayjs()
      .subtract(generateRandomValue(Limit.START, Limit.LAST_WEEK_DAY), 'day')
      .toISOString();
    const city = getRandomItem(this.mockData.cities);
    const preview = getRandomItem(this.mockData.previews);
    const photos = getRandomItems(this.mockData.photos, Limit.MAX_RATING);
    const isPremium = getRandomItem(BOLEANS);
    const isFavorite = getRandomItem(BOLEANS);
    const rating = generateRandomValue(
      Limit.START,
      Limit.MAX_RATING,
      Limit.ROUND_LIMIT
    );
    const type = getRandomItem(this.mockData.types);
    const roomsCount = generateRandomValue(Limit.START, Limit.MAX_ROOMS);
    const guestsCount = generateRandomValue(Limit.START, Limit.MAX_GUESTS);
    const price = generateRandomValue(Limit.MIN_PRICE, Limit.MAX_PRICE);
    const facilities = getRandomItems(this.mockData.facilities);
    const author = getRandomItem(this.mockData.authors);
    const latitude = getRandomItem(this.mockData.latitudes);
    const longitude = getRandomItem(this.mockData.longitudes);

    return [
      name,
      description,
      createdDate,
      city,
      preview,
      photos,
      isPremium,
      isFavorite,
      rating,
      type,
      roomsCount,
      guestsCount,
      price,
      facilities,
      author,
      latitude,
      longitude,
    ].join('\t');
  }
}
