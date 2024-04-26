import { readFileSync } from 'node:fs';

import type { FileReaderInterface } from './fileReader.interface.js';
import type {
  Offer,
  City,
  OfferType,
  Facilitie,
  User,
} from '../types/index.js';

export class TSVFileReader implements FileReaderInterface {
  private rowData = '';

  constructor(private readonly fileName: string) {}

  private validateRowData() {
    if (!this.rowData) {
      throw new Error('There is no data!');
    }
  }

  private parseRowDataToOffers() {
    return this.rowData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseBoolean(value: string): boolean {
    return value === 'true';
  }

  private parsePrice(value: string) {
    return parseInt(value, 10);
  }

  private parseLineToOffer(line: string): Offer {
    const [
      name,
      description,
      createdDate,
      city,
      preview,
      photosList,
      isPremium,
      isFavorite,
      rating,
      type,
      roomsCount,
      guestsCount,
      price,
      facilitiesList,
      author,
      comments,
      latitude,
      longitude,
    ] = line.split('\t');

    return {
      name,
      description,
      date: new Date(createdDate),
      city: city as City,
      preview,
      photos: photosList.split(';'),
      isPremium: this.parseBoolean(isPremium),
      isFavorite: this.parseBoolean(isFavorite),
      rating: Number(rating),
      type: type as OfferType,
      roomsCount: Number(roomsCount),
      guestsCount: Number(guestsCount),
      price: this.parsePrice(price),
      facilities: facilitiesList.split(';') as Facilitie[],
      author: author as unknown as User,
      comments: Number(comments),
      latitude: Number(latitude),
      longitude: Number(longitude),
    };
  }

  public read() {
    this.rowData = readFileSync(this.fileName, 'utf-8');
  }

  public toArray(): Offer[] {
    this.validateRowData();
    return this.parseRowDataToOffers();
  }
}
