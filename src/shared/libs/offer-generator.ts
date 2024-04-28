import dayjs from 'dayjs';

import {
  generateRandomValue,
  getRandomItem,
  getRandomItems,
} from '../helpers/common.js';

import type { OfferGeneretorInterface } from './offer-generetor.interface.js';
import type { MockServerData } from '../types/mock-server-data.type.js';

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_VALUE = 1;
const MAX_ROOMS = 8;
const MAX_GUESTS = 10;
const MAX_RATING = 5;
const ROUND_LIMIT = 2;

const BOLEANS = ['true', 'false'];

export class OfferGenerator implements OfferGeneretorInterface {
  constructor(private readonly mockData: MockServerData) {}
  public generate(): string {
    const name = getRandomItem(this.mockData.names);
    const description = getRandomItems(this.mockData.descriptions);
    const createdDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const city = getRandomItem(this.mockData.cities);
    const preview = getRandomItem(this.mockData.previews);
    const photos = getRandomItems(this.mockData.photos, 6);
    const isPremium = getRandomItem(BOLEANS);
    const isFavorite = getRandomItem(BOLEANS);
    const rating = generateRandomValue(MIN_VALUE, MAX_RATING, ROUND_LIMIT);
    const type = getRandomItem(this.mockData.types);
    const roomsCount = generateRandomValue(MIN_VALUE, MAX_ROOMS);
    const guestsCount = generateRandomValue(MIN_VALUE, MAX_GUESTS);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
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
